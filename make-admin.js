// Script to make a user an admin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    // Replace with your email
    const email = "fabianngaira@gmail.com"; // or "aminofabian@gmail.com"
    
    const updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role: "ADMIN"
      }
    });
    
    console.log(`Successfully updated user to admin: ${updatedUser.email}`);
  } catch (error) {
    console.error("Error updating user to admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin(); 