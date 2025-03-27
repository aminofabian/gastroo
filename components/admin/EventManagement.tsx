"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EventType } from "@prisma/client";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { FaImages, FaNewspaper, FaHandshake, FaDonate, FaChartBar, FaCalendarAlt } from "react-icons/fa";
import AdminLayout from "@/components/admin/AdminLayout";
import { SimpleModal } from "./SimpleModal";
import { CustomEventDialog } from "./CustomEventDialog";
import { CustomDeleteDialog } from "./CustomDeleteDialog";
import EventRegistrationsModal from "./EventRegistrationsModal";

interface EventData {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  venue: string;
  objectives: string[];
  cpdPoints: number;
  speakers: string[];
  moderators: string[];
  capacity?: number | null;
  registrationDeadline?: string | null;
  materials?: Record<string, any> | null;
  memberPrice?: number | null;
  nonMemberPrice?: number | null;
  registrations: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}

type FormValues = z.infer<typeof formSchema>;

const ACCEPTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB instead of 10MB
const MAX_COMBINED_SIZE = 10 * 1024 * 1024; // 10MB total limit for all files combined

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  type: z.nativeEnum(EventType).optional().default("CONFERENCE" as EventType),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  venue: z.string().optional().default(""),
  objectives: z.array(z.string()).optional().default([]),
  cpdPoints: z.number().nonnegative().optional().default(0),
  speakers: z.array(z.string()).optional().default([]),
  moderators: z.array(z.string()).optional().default([]),
  capacity: z.number().nullable().optional(),
  registrationDeadline: z.string().nullable().optional(),
  materials: z.array(z.custom<File>()).optional().default([]),
  memberPrice: z.number().nullable().optional(),
  nonMemberPrice: z.number().nullable().optional(),
});

export default function EventManagement() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState<EventData | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const deleteDialogRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "CONFERENCE" as EventType,
      startDate: "",
      endDate: "",
      venue: "",
      objectives: [],
      cpdPoints: 0,
      speakers: [],
      moderators: [],
      capacity: null,
      registrationDeadline: null,
      materials: [],
      memberPrice: null,
      nonMemberPrice: null,
    },
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        description: selectedEvent.description,
        type: selectedEvent.type,
        startDate: format(new Date(selectedEvent.startDate), "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(selectedEvent.endDate), "yyyy-MM-dd'T'HH:mm"),
        venue: selectedEvent.venue,
        objectives: selectedEvent.objectives,
        cpdPoints: selectedEvent.cpdPoints,
        speakers: selectedEvent.speakers,
        moderators: selectedEvent.moderators,
        capacity: selectedEvent.capacity,
        registrationDeadline: selectedEvent.registrationDeadline,
        materials: selectedEvent.materials as File[],
        memberPrice: selectedEvent.memberPrice || null,
        nonMemberPrice: selectedEvent.nonMemberPrice || null,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        type: "CONFERENCE" as EventType,
        startDate: "",
        endDate: "",
        venue: "",
        objectives: [],
        cpdPoints: 0,
        speakers: [],
        moderators: [],
        capacity: null,
        registrationDeadline: null,
        materials: [],
        memberPrice: null,
        nonMemberPrice: null,
      });
    }
  }, [selectedEvent, form]);

  useEffect(() => {
    // Make sure all input fields are editable
    if (open) {
      setTimeout(() => {
        const formElement = formRef.current;
        if (formElement) {
          // Handle input elements
          const inputElements = formElement.querySelectorAll('input');
          inputElements.forEach((input) => {
            if (input instanceof HTMLInputElement) {
              // Make sure the cursor is text
              input.style.cursor = 'text';
              
              // Make sure the input is not disabled
              input.disabled = false;
              
              // Make sure the input is not readonly
              input.readOnly = false;
              
              // Make sure the input is focusable
              input.tabIndex = 0;
            }
          });
          
          // Handle textarea elements
          const textareaElements = formElement.querySelectorAll('textarea');
          textareaElements.forEach((textarea) => {
            if (textarea instanceof HTMLTextAreaElement) {
              textarea.style.cursor = 'text';
              textarea.disabled = false;
              textarea.readOnly = false;
              textarea.tabIndex = 0;
            }
          });
          
          // Handle select elements
          const selectElements = formElement.querySelectorAll('select');
          selectElements.forEach((select) => {
            if (select instanceof HTMLSelectElement) {
              select.style.cursor = 'pointer';
              select.disabled = false;
              select.tabIndex = 0;
            }
          });
        }
      }, 100); // Small delay to ensure the DOM is ready
    }
  }, [open]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      const data = await response.json();
      setEvents(data as EventData[]);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileErrors(null);
    
    // Calculate total size of all files
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    // Validate total size
    if (totalSize > MAX_COMBINED_SIZE) {
      setFileErrors(`Total file size (${formatBytes(totalSize)}) exceeds the maximum allowed (${formatBytes(MAX_COMBINED_SIZE)}). Please reduce file sizes.`);
      return;
    }
    
    // Validate each file
    const invalidFiles = files.filter(file => {
      // Check if file type is in accepted formats
      const isValidType = Object.keys(ACCEPTED_FILE_TYPES).includes(file.type);
      
      // Check if individual file size is under limit
      const isValidSize = file.size <= MAX_FILE_SIZE;
      
      return !isValidType || !isValidSize;
    });
    
    if (invalidFiles.length > 0) {
      setFileErrors(`Some files are not valid. Please ensure all files are of accepted types and under ${formatBytes(MAX_FILE_SIZE)}.`);
      return;
    }
    
    setSelectedFiles(files);
    form.setValue('materials', files);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (fileErrors) {
        toast({
          title: "Error",
          description: fileErrors,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const url = selectedEvent
        ? `/api/admin/events/${selectedEvent.id}`
        : "/api/admin/events";
      const method = selectedEvent ? "PATCH" : "POST";

      toast({
        title: "Processing",
        description: "Uploading files and creating event...",
      });

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("type", values.type || "CONFERENCE");
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("venue", values.venue || "");
      formData.append("objectives", JSON.stringify(values.objectives || []));
      formData.append("cpdPoints", (values.cpdPoints || 0).toString());
      formData.append("speakers", JSON.stringify(values.speakers || []));
      formData.append("moderators", JSON.stringify(values.moderators || []));
      if (values.capacity !== undefined && values.capacity !== null) 
        formData.append("capacity", values.capacity.toString());
      if (values.registrationDeadline) 
        formData.append("registrationDeadline", values.registrationDeadline);
      
      formData.append("memberPrice", values.memberPrice === null || values.memberPrice === undefined ? 'null' : values.memberPrice.toString());
      formData.append("nonMemberPrice", values.nonMemberPrice === null || values.nonMemberPrice === undefined ? 'null' : values.nonMemberPrice.toString());

      // Handle file uploads
      if (selectedFiles && selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          formData.append("materials", file);
          console.log('Adding file to form data:', {
            name: file.name,
            type: file.type,
            size: file.size
          });
        }
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      // Handle response similar to banner upload
      const contentType = response.headers.get("content-type");
      
      // Clone the response before reading it
      const responseClone = response.clone();
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Response parsing error:', {
          status: responseClone.status,
          contentType,
        });
        // Read the text from the cloned response
        const text = await responseClone.text();
        console.error('Response text:', text);
        throw new Error('Failed to parse server response');
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to ${selectedEvent ? 'update' : 'create'} event`);
      }

      toast({
        title: "Success",
        description: `Event ${selectedEvent ? 'updated' : 'created'} successfully`,
      });
      setOpen(false);
      setSelectedEvent(null);
      setSelectedFiles([]);
      form.reset();
      fetchEvents();
    } catch (error: any) {
      console.error(`Error ${selectedEvent ? 'updating' : 'creating'} event:`, error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${selectedEvent ? 'update' : 'create'} event`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event: EventData) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const response = await fetch(`/api/admin/events/${eventToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleViewRegistrations = (event: EventData) => {
    setSelectedEventForRegistrations(event);
    setShowRegistrationsModal(true);
  };

  // Add this function to handle modal clicks
  const handleModalClick = (e: React.MouseEvent) => {
    // Stop the event from propagating to prevent the modal from closing
    e.stopPropagation();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md border border-[#c22f63]/20">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#c22f63]">Event Management</h1>
            <p className="text-gray-500 mt-1">Create, edit and manage events for your organization</p>
          </div>
          
          <Button 
            size="lg" 
            className="gap-2 bg-[#c22f63] hover:bg-[#b02a57] transition-all shadow-md"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add New Event
          </Button>
          
          <CustomEventDialog
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setSelectedEvent(null);
            }}
            title={selectedEvent ? 'Edit Event' : 'Create New Event'}
            description={`Fill in the details below to ${selectedEvent ? 'update' : 'create'} an event.`}
          >
            <Form {...form}>
              <form 
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Title</FormLabel>
                        <FormControl>
                          <Input 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger 
                              className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-pointer" 
                            >
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(EventType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#c22f63]">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[80px] resize-none border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Start Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Venue</FormLabel>
                        <FormControl>
                          <Input 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpdPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">CPD Points</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Capacity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value?.toString() || ''} 
                            onChange={(e) => {
                              const value = e.target.value === '' ? null : parseInt(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Registration Deadline</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value || ''} 
                            onChange={(e) => field.onChange(e.target.value || null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="memberPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Member Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value?.toString() || ''} 
                            onChange={(e) => {
                              const value = e.target.value === '' ? null : parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nonMemberPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Non-Member Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value?.toString() || ''} 
                            onChange={(e) => {
                              const value = e.target.value === '' ? null : parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#c22f63]">Objectives (one per line)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[80px] resize-none border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                          value={field.value?.join('\n') || ''} 
                          onChange={(e) => field.onChange(e.target.value.split('\n').filter(line => line.trim() !== ''))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="speakers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Speakers (one per line)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[80px] resize-none border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value?.join('\n') || ''} 
                            onChange={(e) => field.onChange(e.target.value.split('\n').filter(line => line.trim() !== ''))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="moderators"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#c22f63]">Moderators (one per line)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[80px] resize-none border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-text" 
                            value={field.value?.join('\n') || ''} 
                            onChange={(e) => field.onChange(e.target.value.split('\n').filter(line => line.trim() !== ''))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#c22f63]">Materials</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Input 
                            type="file" 
                            className="h-10 border-[#c22f63]/20 focus:border-[#c22f63] focus:ring-[#c22f63] shadow-sm cursor-pointer" 
                            accept={Object.keys(ACCEPTED_FILE_TYPES).join(",")}
                            onChange={handleFileSelect}
                            multiple
                          />
                          <div className="text-xs text-gray-500">
                            Accepted file types: {Object.values(ACCEPTED_FILE_TYPES).join(', ')} | 
                            Max size per file: {formatBytes(MAX_FILE_SIZE)} | 
                            Max total size: {formatBytes(MAX_COMBINED_SIZE)}
                          </div>
                          {fileErrors && (
                            <div className="text-red-500 text-sm">
                              {fileErrors}
                            </div>
                          )}
                          {selectedFiles.length > 0 && (
                            <div className="text-sm text-gray-500">
                              {selectedFiles.length} file(s) selected ({selectedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024 < 1 
                                ? `${(selectedFiles.reduce((total, file) => total + file.size, 0) / 1024).toFixed(1)} KB` 
                                : `${(selectedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(1)} MB`})
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-6 border-t border-[#c22f63]/10">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpen(false)}
                    className="border-[#c22f63]/30 text-[#c22f63] hover:bg-[#c22f63]/5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#c22f63] hover:bg-[#b02a57] transition-all shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {selectedEvent ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>{selectedEvent ? 'Update Event' : 'Create Event'}</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CustomEventDialog>
        </div>

        <CustomDeleteDialog
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setEventToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Event"
          description="This action cannot be undone."
        />

        <div className="rounded-lg border border-[#c22f63]/20 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#c22f63]">
                <TableHead className="font-semibold text-white">Title</TableHead>
                <TableHead className="font-semibold text-white">Type</TableHead>
                <TableHead className="font-semibold text-white">Start Date</TableHead>
                <TableHead className="font-semibold text-white">End Date</TableHead>
                <TableHead className="font-semibold text-white">Venue</TableHead>
                <TableHead className="font-semibold text-white">CPD Points</TableHead>
                <TableHead className="font-semibold text-white">Member Price</TableHead>
                <TableHead className="font-semibold text-white">Non-Member Price</TableHead>
                <TableHead className="font-semibold text-white">Speakers</TableHead>
                <TableHead className="font-semibold text-white">Moderators</TableHead>
                <TableHead className="font-semibold text-white">Capacity</TableHead>
                <TableHead className="font-semibold text-white">Attendees</TableHead>
                <TableHead className="font-semibold text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="hover:bg-[#c22f63]/5 border-b border-[#c22f63]/10">
                  <TableCell className="font-medium text-[#c22f63]">{event.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-[#c22f63]/10 px-2 py-1 text-xs font-medium text-[#c22f63] ring-1 ring-inset ring-[#c22f63]/20 shadow-sm">
                      {event.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {format(new Date(event.startDate), "PPp")}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {format(new Date(event.endDate), "PPp")}
                  </TableCell>
                  <TableCell className="text-gray-700">{event.venue}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 shadow-sm">
                      {event.cpdPoints} points
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-[#c22f63]/10 px-2 py-1 text-xs font-medium text-[#c22f63] ring-1 ring-inset ring-[#c22f63]/20 shadow-sm">
                      {event.memberPrice !== null ? `KES ${event.memberPrice?.toLocaleString()}` : 'Free'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-[#c22f63]/10 px-2 py-1 text-xs font-medium text-[#c22f63] ring-1 ring-inset ring-[#c22f63]/20 shadow-sm">
                      {event.nonMemberPrice !== null ? `KES ${event.nonMemberPrice?.toLocaleString()}` : 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-gray-700" title={event.speakers.join(", ")}>
                    {event.speakers.join(", ")}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-gray-700" title={event.moderators.join(", ")}>
                    {event.moderators.join(", ")}
                  </TableCell>
                  <TableCell>
                    {event.capacity ? (
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 shadow-sm">
                        {event.capacity} seats
                      </span>
                    ) : (
                      <span className="text-gray-500">Unlimited</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/20 shadow-sm">
                      {event.registrations?.length || 0} registered
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleViewRegistrations(event)}
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        title="View Registrations"
                      >
                        <FaUsers className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleEdit(event)}
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-[#c22f63]/30 text-[#c22f63] hover:bg-[#c22f63]/5 hover:text-[#c22f63] transition-colors"
                        title="Edit Event"
                      >
                        <FaEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(event.id)}
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700 transition-colors"
                        title="Delete Event"
                      >
                        <FaTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Event Registrations Modal */}
      {showRegistrationsModal && selectedEventForRegistrations && (
        <EventRegistrationsModal
          isOpen={showRegistrationsModal}
          onClose={() => {
            setShowRegistrationsModal(false);
            setSelectedEventForRegistrations(null);
          }}
          eventId={selectedEventForRegistrations.id}
          eventTitle={selectedEventForRegistrations.title}
        />
      )}
    </AdminLayout>
  );
} 