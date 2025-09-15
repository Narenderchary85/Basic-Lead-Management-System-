import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiBarChart2, FiTarget, FiCheckCircle, FiArrowRight, FiPlay, FiPieChart } from 'react-icons/fi';
import Navbar from './Navbar';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Lead Capture",
      description: "Automatically capture leads from multiple sources and centralize them in one place.",
      icon: <FiUsers className="text-2xl" />,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Lead Scoring",
      description: "Prioritize your leads with intelligent scoring based on engagement and profile data.",
      icon: <FiBarChart2 className="text-2xl" />,
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "Conversion Tracking",
      description: "Track every interaction and monitor conversion rates through your sales pipeline.",
      icon: <FiTrendingUp className="text-2xl" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Analytics Dashboard",
      description: "Gain insights with visual reports and data-driven recommendations.",
      icon: <FiPieChart className="text-2xl" />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director, TechCorp",
      content: "LeadFlow has transformed how we manage our sales pipeline. Our conversion rates increased by 42% in just three months.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager, GrowthLab",
      content: "The automation features save us hours each week. Now we can focus on selling instead of data entry.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Business Owner, Elite Services",
      content: "As a small business, LeadFlow gives us enterprise-level tools at an affordable price. Game changer!",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
        <Navbar/>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            >
              Transform Your Lead Management
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto mb-10"
            >
              Streamline your sales process, convert more leads, and grow your business with our powerful lead management platform.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
               <Link to="/login">
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center"
                >
                  Login 
                </motion.button>
           
               </Link>
              
             <Link to="/signup">
             <button className="bg-white text-slate-800 border border-slate-200 hover:border-indigo-300 px-6 py-3 rounded-lg font-medium transition flex items-center shadow-sm">
                SignUp
              </button>
             </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-60 -left-32 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            >
              Powerful Features for Lead Management
            </motion.h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to capture, nurture, and convert leads into loyal customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-xl border border-slate-200 transition-all cursor-pointer ${activeFeature === index ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md'}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mr-4`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <motion.div 
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-80 bg-slate-100 rounded-xl overflow-hidden relative"
              >

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 bg-white rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <FiTarget className="text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="h-20 bg-indigo-50 rounded-lg p-3">
                        <div className="h-4 bg-indigo-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-indigo-600 rounded w-3/4"></div>
                      </div>
                      <div className="h-20 bg-teal-50 rounded-lg p-3">
                        <div className="h-4 bg-teal-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-teal-600 rounded w-2/3"></div>
                      </div>
                      <div className="h-20 bg-blue-50 rounded-lg p-3">
                        <div className="h-4 bg-blue-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-blue-600 rounded w-1/2"></div>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between mb-3">
                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                      </div>
                      <div className="flex items-end h-20 space-x-1">
                        {[30, 50, 70, 90, 60, 40, 80].map((height, index) => (
                          <div 
                            key={index} 
                            className={`flex-1 rounded-t ${activeFeature === 0 ? 'bg-indigo-500' : activeFeature === 1 ? 'bg-teal-500' : activeFeature === 2 ? 'bg-blue-500' : 'bg-purple-500'}`}
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                  <FiTrendingUp className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold">LeadFlow</span>
              </div>
              <p className="text-slate-400">Transforming lead management for sales teams worldwide.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} LeadFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;