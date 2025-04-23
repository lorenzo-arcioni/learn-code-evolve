import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const Terms = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="lead text-xl mb-6">
            Last updated: {new Date().toLocaleDateString('it-IT')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to ML Learn. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use ML Learn if you do not 
            accept all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. License to Use</h2>
          <p>
            Unless otherwise stated, ML Learn and/or its licensors own the intellectual property rights for all material on ML Learn. 
            All intellectual property rights are reserved.
          </p>
          <p>
            You may view and/or print pages from our website for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>Redistribute content from ML Learn (unless content is specifically made for redistribution)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Account</h2>
          <p>
            When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. 
            Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the service.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of 
            access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your 
            account and/or password.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Services and Pricing</h2>
          <p>
            We reserve the right at any time to modify or discontinue the service (or any part or content thereof) without notice at any time. 
            We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Italy, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these 
            Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Email:</strong> terms@mllearn.com
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;