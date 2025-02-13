import React from 'react';

const BlogAdminPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Blog Administration</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Blog Access Information</h2>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="font-medium text-gray-700 mb-2">Blog URL:</p>
              <a 
                href="https://gastro.or.ke/blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-lg"
              >
                https://gastro.or.ke/blog
              </a>
            </div>
            
            <div className="text-center">
              <p className="font-medium text-gray-700 mb-3">Login Credentials:</p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Username:</span>{' '}
                  <span className="bg-gray-50 px-3 py-1 rounded">gastroblog</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Password:</span>{' '}
                  <span className="bg-gray-50 px-3 py-1 rounded">3209</span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="https://blog.gastro.or.ke/wp-admin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Go to WordPress Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdminPage;
