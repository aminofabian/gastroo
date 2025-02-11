"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaUser, FaEnvelope, FaPhone, FaHospital, FaGraduationCap } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile/current');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Profile Information
            {userData.emailVerified && (
              <Badge variant="default" className="bg-green-500">
                <MdVerified className="mr-1" /> Verified
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.image || ''} />
              <AvatarFallback className="text-2xl">
                {userData.firstName?.[0]}{userData.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userData.firstName} {userData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FaHospital className="text-gray-500" />
                  Professional Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Designation</p>
                    <p className="font-medium">{userData.designation || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital</p>
                    <p className="font-medium">{userData.hospital || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium">{userData.specialization || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{userData.licenseNumber || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              {userData.education && userData.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaGraduationCap className="text-gray-500" />
                    Education
                  </h3>
                  <div className="space-y-2 mt-2">
                    {userData.education.map((edu: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-500">
                          {edu.degree} in {edu.field} ({edu.startYear} - {edu.endYear || 'Present'})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{userData.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}