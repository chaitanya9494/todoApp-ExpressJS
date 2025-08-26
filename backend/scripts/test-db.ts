import { prisma } from '../src/utils/database';

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test basic operations
    console.log('🧪 Running basic tests...');
    
    // Create a test task
    const testTask = await prisma.task.create({
      data: {
        title: 'Test Task',
        color: '#FF5733',
      },
    });
    console.log('✅ Created test task:', testTask.id);
    
    // Fetch all tasks
    const tasks = await prisma.task.findMany();
    console.log('✅ Retrieved tasks:', tasks.length);
    
    // Clean up test task
    await prisma.task.delete({
      where: { id: testTask.id },
    });
    console.log('✅ Cleaned up test task');
    
    console.log('🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
