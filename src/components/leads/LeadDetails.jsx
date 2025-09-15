import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiPhone, FiUser, FiCalendar, FiStar } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const LeadDetails = ({ lead, isOpen, onClose }) => {
  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <FiX size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <FiUser className="text-indigo-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {lead.first_name} {lead.last_name}
                </h2>
                <p className="text-slate-500">{lead.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <FiMail /> <span>{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <FiPhone /> <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <FiCalendar /> <span>Created: {new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <FiCalendar /> <span>Last Activity: {lead.last_activity_at ? new Date(lead.last_activity_at).toLocaleDateString() : "Never"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-semibold">Status:</span>
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    {lead.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-semibold">Source:</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                    {lead.source.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <FiStar className="text-yellow-500" /> <span>Score: {lead.score}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <FaRupeeSign className="text-green-500" /> <span>Value: {lead.lead_value}</span>
                </div>
              </div>
            </div>


            {lead.notes && (
              <div className="mt-6">
                <h3 className="text-md font-semibold text-slate-900 mb-2">Notes</h3>
                <p className="text-slate-600">{lead.notes}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadDetails;
