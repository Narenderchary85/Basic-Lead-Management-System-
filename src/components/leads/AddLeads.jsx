import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMapPin,
  FiStar,
  FiGlobe,
  FiCalendar
} from 'react-icons/fi';
import { FaRupeeSign } from "react-icons/fa";

const AddLead = ({ isOpen, onClose, onLeadAdded }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    source: 'website',
    status: 'new',
    score: 0,
    lead_value: 0,
    last_activity_at: '',
    is_qualified: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/leads/addlead`, formData, {
        withCredentials:true
      });

      if (response.data.success) {
        onLeadAdded(response.data.lead);
        onClose();
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          company: '',
          city: '',
          state: '',
          source: 'website',
          status: 'new',
          score: 0,
          lead_value: 0,
          last_activity_at: '',
          is_qualified: false
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lead. Please try again.');
      console.error('Error adding lead:', err);
    } finally {
      setLoading(false);
    }
  };

  const sources = [
    { value: 'website', label: 'Website' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'referral', label: 'Referral' },
    { value: 'events', label: 'Events' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-800">Add New Lead</h3>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
   
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </div>
              </div>
 
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Source
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiGlobe className="text-slate-400" />
                  </div>
                  <select
                    name="source"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    {sources.map(source => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Score (0-100)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiStar className="text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="score"
                    min="0"
                    max="100"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.score}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lead Value
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="lead_value"
                    min="0"
                    step="0.01"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.lead_value}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Activity Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-slate-400" />
                  </div>
                  <input
                    type="datetime-local"
                    name="last_activity_at"
                    className="pl-10 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.last_activity_at}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="is_qualified"
                  id="is_qualified"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  checked={formData.is_qualified}
                  onChange={handleChange}
                />
                <label htmlFor="is_qualified" className="ml-2 block text-sm text-slate-700">
                  Mark as qualified
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Lead'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddLead;