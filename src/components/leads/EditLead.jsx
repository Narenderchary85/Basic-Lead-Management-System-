import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import axios from "axios";

const EditLead = ({
  showEditModal,
  setShowEditModal,
  editingLead,
  setEditingLead,
  leads,
  setLeads,
  setError,
}) => {
  const handleUpdateLead = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/leads/editlead/${editingLead._id}`,
        editingLead,
        { withCredentials:true }
      );

      if (response.data.success) {
        setLeads(
          leads.map((lead) =>
            lead._id === editingLead._id ? response.data.lead : lead
          )
        );
        setShowEditModal(false);
        setEditingLead(null);
      }
    } catch (err) {
      setError("Failed to update lead. Please try again.");
      console.error("Error updating lead:", err);
    }
  };

  return (
    <AnimatePresence>
      {showEditModal && editingLead && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-slate-800">Edit Lead</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateLead} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.first_name}
                    onChange={(e) => setEditingLead({ ...editingLead, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.last_name}
                    onChange={(e) => setEditingLead({ ...editingLead, last_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.email}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.company || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.city || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.state || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.source}
                    onChange={(e) => setEditingLead({ ...editingLead, source: e.target.value })}
                  >
                    <option value="website">Website</option>
                    <option value="facebook_ads">Facebook Ads</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="referral">Referral</option>
                    <option value="events">Events</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.status}
                    onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Score (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.score}
                    onChange={(e) => setEditingLead({ ...editingLead, score: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lead Value</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    value={editingLead.lead_value}
                    onChange={(e) => setEditingLead({ ...editingLead, lead_value: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Update Lead
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditLead;
