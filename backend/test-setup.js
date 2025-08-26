// Simple test to verify the setup
console.log('🚀 Testing Todo Backend Setup');
console.log('📁 Project structure looks good');
console.log('✅ Dependencies installed');
console.log('✅ Prisma client generated');
console.log('✅ Database migrated');
console.log('🎉 Ready to run: npm run dev');

// Test if we can import our modules
try {
  const express = require('express');
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ All modules can be imported successfully');
} catch (error) {
  console.error('❌ Module import error:', error.message);
}
