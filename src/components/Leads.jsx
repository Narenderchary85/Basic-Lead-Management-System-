import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiStar,
} from 'react-icons/fi';
import AddLead from './leads/AddLeads';
import EditLead from './leads/EditLead';
import Pagination from './Pagination';
import LeadDetails from './leads/LeadDetails';
import { FaRupeeSign } from "react-icons/fa";
import Navbar from './Navbar';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/leads/getleads?page=${pageNumber}&limit=10`,
        { withCredentials:true }
      );
  
      if (response.data.success) {
        setLeads(response.data.data);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };
  
  useEffect(() => {
    fetchLeads(1);
  }, []);
  

  const searchLeads = async (term) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/leads/search?q=${encodeURIComponent(term)}`,
        { withCredentials:true }
      );
  
      if (response.data.success) {
        setFilteredLeads(response.data.leads);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        searchLeads(searchTerm);
      } else {
        setFilteredLeads(leads);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, leads]);


  useEffect(() => {
    let result = [...leads];
    
    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }
    
    if (sourceFilter !== 'all') {
      result = result.filter(lead => lead.source === sourceFilter);
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    setFilteredLeads(result);
  }, [statusFilter, sourceFilter, sortBy, sortOrder, leads]);

  const handleDeleteLead = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/leads/deletelead/${id}`, {
        withCredentials:true
      });
      
      setLeads(leads.filter(lead => lead._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete lead. Please try again.');
      console.error('Error deleting lead:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'won': return 'bg-indigo-100 text-indigo-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'website': return 'bg-teal-100 text-teal-800';
      case 'facebook_ads': return 'bg-blue-100 text-blue-800';
      case 'google_ads': return 'bg-red-100 text-red-800';
      case 'referral': return 'bg-green-100 text-green-800';
      case 'events': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && leads.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleLeadAdded = (newLead) => {
    setLeads((prev) => [...prev, newLead]);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Leads Management</h1>
            <p className="text-slate-600">Manage and track your leads effectively</p>
          </div>
          <button  onClick={() => setIsAddLeadOpen(true)} className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
            <FiPlus className="mr-2" /> Add New Lead
          </button>
        </motion.div>

    
          <AddLead
          isOpen={isAddLeadOpen}
          onClose={() => setIsAddLeadOpen(false)}
          onLeadAdded={handleLeadAdded}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search leads by name, email, company..."
                className="pl-10 w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg flex items-center"
            >
              <FiFilter className="mr-2" /> Filters
              {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
            </button>
          </div>

          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-5"
        >
          {[
            { title: 'Total Leads', value: leads.length, color: 'bg-blue-500' },
            { title: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: 'bg-purple-500' },
            { title: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: 'bg-green-500' },
            { title: 'Converted', value: leads.filter(l => l.status === 'won').length, color: 'bg-indigo-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <FiUser className="text-white text-xl" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                  >
                    <option value="all">All Sources</option>
                    <option value="website">Website</option>
                    <option value="facebook_ads">Facebook Ads</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="referral">Referral</option>
                    <option value="events">Events</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="created_at">Created Date</option>
                      <option value="first_name">First Name</option>
                      <option value="last_name">Last Name</option>
                      <option value="score">Score</option>
                      <option value="lead_value">Value</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="bg-slate-100 hover:bg-slate-200 px-3 rounded-lg"
                    >
                      {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
        >
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-slate-400 mb-4">No leads found</div>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score/Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <AnimatePresence>
                    {filteredLeads.map((lead) => (
                      <motion.tr
                        key={lead._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div  onClick={() => {
                          setSelectedLead(lead);
                          setShowDetails(true);
                        }} className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <FiUser className="text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">
                                {lead.first_name} {lead.last_name}
                              </div>
                              <div className="text-sm text-slate-500">{lead.company}</div>
                            </div>
                          </div>
                        </td>
                        <td  onClick={() => {
                          setSelectedLead(lead);
                          setShowDetails(true);
                        }} className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{lead.email}</div>
                          <div className="text-sm text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(lead.source)}`}>
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiStar className="text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{lead.score}</span>
                            <FaRupeeSign className="text-green-500 ml-3 mr-1" />
                            <span className="text-sm font-medium">{lead.lead_value}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">
                            {lead.last_activity_at ? new Date(lead.last_activity_at).toLocaleDateString() : 'Never'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingLead(lead);
                                setShowEditModal(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(lead._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <EditLead
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editingLead={editingLead}
        setEditingLead={setEditingLead}
        leads={leads}
        setLeads={setLeads}
        setError={setError}
      />

        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 bg-white/50 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-medium text-slate-800 mb-2">Confirm Deletion</h3>
                <p className="text-slate-600 mb-6">Are you sure you want to delete this lead? This action cannot be undone.</p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteLead(deleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Lead
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <LeadDetails
        lead={selectedLead}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => fetchLeads(newPage)}
      />

      </div>
    </div>
    </>
  );
};

export default Leads;