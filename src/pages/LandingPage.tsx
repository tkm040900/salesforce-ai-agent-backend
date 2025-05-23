
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Transform Your Salesforce Experience with{" "}
                <span className="gradient-text">AI Agents</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Unlock the power of intelligent automation in your Salesforce org with
                our AI-powered solutions that understand natural language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative bg-white p-1 rounded-2xl shadow-xl border border-gray-100">
                <div className="bg-gray-100 rounded-xl p-3 text-sm font-mono text-gray-900">
                  <div className="mb-2 text-accent-foreground">&gt; Give me the top 5 opportunities closing this month</div>
                  <div className="mb-4 text-agent pl-4">Fetching your top opportunities...</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-2">RESULTS</div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Amount</th>
                          <th className="text-left py-2">Stage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-1">Acme - 200 Widgets</td>
                          <td className="py-1">$120,000</td>
                          <td className="py-1">Negotiation</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1">Global Corp Expansion</td>
                          <td className="py-1">$86,000</td>
                          <td className="py-1">Proposal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading text-center">Powerful AI-Powered Features</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Our intelligent agents simplify your interactions with Salesforce data
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M13 12H7"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Natural Language Queries</h3>
                <p className="text-gray-600">
                  Simply ask questions in plain English and our AI translates them into
                  complex SOQL queries, delivering precise data.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-plus"><path d="M15 5.5A3.5 3.5 0 0 1 18.5 9H21v12h-8v-4.5"/><path d="M8 8.5A3.5 3.5 0 0 1 11.5 5H15v12H3V8.5"/><path d="M6 14h6"/><path d="M9 11v6"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Effortless CRUD Operations</h3>
                <p className="text-gray-600">
                  Create, update, and delete records with simple conversational commands,
                  eliminating complex form navigation.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Context-Aware Assistance</h3>
                <p className="text-gray-600">
                  Our AI remembers your conversation history, providing relevant
                  insights and suggestions based on previous interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6.75c0-.69.56-1.25 1.25-1.25h13.5c.69 0 1.25.56 1.25 1.25z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Enterprise-Grade Security</h3>
                <p className="text-gray-600">
                  Rest easy with our robust security measures ensuring your Salesforce
                  data remains protected at all times.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Transform raw Salesforce data into actionable insights with
                  intelligent analysis and visualization capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 mb-6 flex items-center justify-center rounded-lg bg-accent text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M13 2H11L3 14h9l-1 8 8-12H10l2-8z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning-Fast Responses</h3>
                <p className="text-gray-600">
                  Experience rapid query processing and response times for
                  seamless Salesforce data interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-salesforce to-agent text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Salesforce Experience?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of Salesforce users who are saving time and increasing
            productivity with our AI-powered solution.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 hover:text-primary"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
