
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-text">OpenOrg AI</h3>
            <p className="text-gray-600">
              Intelligent Salesforce operations powered by AI agents to streamline your workflow.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-600">
              Have questions? Reach out to our support team.
            </p>
            <p className="text-gray-600 mt-2">
              Email: support@openorg.ai
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} OpenOrg AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
