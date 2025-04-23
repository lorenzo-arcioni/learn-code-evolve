import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const CookiePolicy = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose max-w-none">
          <p className="lead text-xl mb-6">
            Last updated: {new Date().toLocaleDateString('it-IT')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and 
            allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you 
            go offline, while session cookies are deleted as soon as you close your web browser.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
          <p>
            When you use and access our service, we may place a number of cookie files in your web browser.
          </p>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Authentication</strong> – We use cookies to identify you when you visit our website and as you navigate our website.</li>
            <li><strong>Status</strong> – We use cookies to help us to determine if you are logged into our website.</li>
            <li><strong>Personalization</strong> – We use cookies to store information about your preferences and to personalize the website for you.</li>
            <li><strong>Security</strong> – We use cookies as an element of the security measures used to protect user accounts, including preventing 
            fraudulent use of login credentials, and to protect our website and services generally.</li>
            <li><strong>Analysis</strong> – We use cookies to help us to analyze the use and performance of our website and services.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
          <p>
            We use both session and persistent cookies on the service and we use different types of cookies to run the service:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential cookies.</strong> These cookies are essential to provide you with services available through the website and to 
            enable you to use some of its features. Without these cookies, the services that you have asked for cannot be provided, and we only 
            use these cookies to provide you with those services.</li>
            <li><strong>Functionality cookies.</strong> These cookies allow our website to remember choices you make when you use our website, 
            such as remembering your login details or language preference. The purpose of these cookies is to provide you with a more personal 
            experience and to avoid you having to re-enter your preferences every time you use the website.</li>
            <li><strong>Analytics cookies.</strong> These cookies allow us to collect information about how you use our website, such as which 
            pages you visit most often or if you get error messages from certain pages.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set 
            cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
          </p>
          <p>
            Some browsers offer a "Do Not Track" ("DNT") signal where you can indicate your preference regarding tracking and cross-site tracking. 
            Although we do not currently employ technology that recognizes DNT signals, we will only process your personal data in accordance with this Policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Email:</strong> cookies@mllearn.com
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CookiePolicy;