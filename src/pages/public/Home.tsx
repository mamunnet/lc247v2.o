import React, { useState } from 'react';
import { ExternalLink, Eye, AlertTriangle } from 'lucide-react';
import { useAgents } from '../../contexts/AgentContext';
import { useNotices } from '../../contexts/NoticeContext';
import NoticeBoard from '../../components/NoticeBoard';
import ReportModal from '../../components/ReportModal';
import ViewAgentModal from '../../components/ViewAgentModal';
import WhatsAppIcon from '../../components/icons/WhatsAppIcon';
import HeroBanner from '../../components/HeroBanner';
import { Agent } from '../../types';

const Home = () => {
  const { agents } = useAgents();
  const { notices } = useNotices();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Get a random master agent
  const masterAgents = agents.filter(agent => agent.role === 'master-agent');
  const randomMasterAgent = masterAgents[Math.floor(Math.random() * masterAgents.length)];

  const handleReport = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowReportModal(true);
  };

  const handleView = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6 -mt-8">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Notice Board */}
      <NoticeBoard notices={notices} />

      <div className="container mx-auto px-4">
        <h1 className="text-xl md:text-3xl font-bold text-center">
          <span className="text-white">LC</span>
          <span className="text-[#65EDBF]">247</span>
          <span className="text-white"> OFFICIAL WEBSITE</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* Quick Master Agent */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3 text-emerald-400">
              কুইক মাস্টার এজেন্ট নম্বর
            </h2>
            {randomMasterAgent && (
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {randomMasterAgent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm md:text-base">{randomMasterAgent.name}</h3>
                  <p className="text-xs md:text-sm text-emerald-400">{randomMasterAgent.id}</p>
                  <p className="text-xs md:text-sm text-gray-400">{randomMasterAgent.phoneNumber}</p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href={randomMasterAgent.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#128C7E] transition-colors"
                      title="Contact on WhatsApp"
                    >
                      <WhatsAppIcon />
                    </a>
                    <button
                      onClick={() => handleView(randomMasterAgent)}
                      className="text-blue-400 hover:text-blue-300"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReport(randomMasterAgent)}
                      className="text-red-400 hover:text-red-300"
                      title="Report Agent"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Facebook Group */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3 text-emerald-400 text-center">
              আমাদের অফিসিয়াল ফেসবুক গ্রুপ
            </h2>
            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/groups/lcexchanges247"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Join Our Community</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Proxy Links */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3 text-emerald-400">
              আমাদের প্রক্সি লিংক
            </h2>
            <div className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar">
              {[
                { url: 'lc247.live', label: 'Main Website' },
                { url: 'lc247.games', label: 'Games Portal' },
                { url: 'lc247.bet', label: 'Betting Platform' }
              ].map((link) => (
                <div key={link.url} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-400">{link.label}</p>
                    <p className="text-sm">{link.url}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-xs">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                      Active
                    </span>
                    <a
                      href={`https://${link.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded-md text-xs transition-colors duration-200"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rules and Regulations */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-lg overflow-hidden mt-6">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6">
              <span className="text-white">এজেন্ট কয়</span>
              <span className="text-[#65EDBF]"> প্রকার</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 border border-emerald-500/20 rounded-lg p-3 md:p-6 transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-3 mb-3">
                  <h3 className="text-base md:text-xl font-semibold text-emerald-400 text-center">
                    অনলাইন সুপার এজেন্ট
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 text-center leading-relaxed">
                  সুপার এজেন্টরা ইউজার একাউন্ট এবং মাস্টার এজেন্ট একাউন্ট খুলে দিতে পারেন. কোন সুপার এজেন্টের নামে অভিযোগ থাকলে সরাসরি এডমিনকে জানাতে হবে উপরে মেনুতে এডমিন লিস্ট দেওয়া আছে।
                </p>
              </div>

              <div className="bg-gray-800 border border-emerald-500/20 rounded-lg p-3 md:p-6 transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-3 mb-3">
                  <h3 className="text-base md:text-xl font-semibold text-emerald-400 text-center">
                    অনলাইন মাষ্টার এজেন্ট
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 text-center leading-relaxed">
                  অনলাইন মাস্টার এজেন্টরা শুধু ইউজার একাউন্ট খুলে দিতে পারেন কোন মাস্টার এজেন্টের নামে অভিযোগ থাকলে সরাসরি সুপার এজেন্টের কাছে অভিযোগ করতে হবে বিস্তারিত জানতে এই লিংকে ক্লিক করুন।
                </p>
              </div>

              <div className="bg-gray-800 border border-emerald-500/20 rounded-lg p-3 md:p-6 transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-3 mb-3">
                  <h3 className="text-base md:text-xl font-semibold text-emerald-400 text-center">
                    লোকাল মাষ্টার এজেন্ট
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 text-center leading-relaxed">
                  লোকাল মাস্টার্স এর লিস্ট লোকাল মাস্টার এজেন্টরা শুধু ইউজার অ্যাকাউন্ট খুলে দিতে পারেন কিন্তু তাদের সাথে লেনদেন প্রতিটি ইউজারকে নিজ দায়িত্বে লেনদেন করতে হবে তাদের নামে কোন অভিযোগ কারো কাছে করা যাবেনা লোকাল মাস্টার এজেন্ট এইসব সাধারণত নিজের এলাকায় বা পরিচিতদের সাথে লেনদেন করে যারা আগে বাজিয়ে দিতো তাদেরকেই মূলত লোকাল এজেন্ট দেওয়া হয়েছে লোকাল এজেন্টরা অনলাইনে আসে না এবং তারা তাদের পরিচয় গোপন রাখতে চায় এজেন্ট এর সাথে অনলাইনে কোন ভাবে লেনদেন করবেন না আর করে থাকলে তার দায়ভার পুরোটাই আপনার।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent List Instructions */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
            <span className="text-white">এজেন্ট</span>
            <span className="text-[#65EDBF]"> লিস্ট</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            অ্যাকাউন্ট খুলতে নিম্নের অনলাইন এজেন্ট লিস্ট এ ক্লিক করুন । এজেন্ট লিস্ট এর এজেন্ট দের সাথে ইউজার দের শুধুমাত্র হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করতে হবে। হোয়াটসঅ্যাপ ছাড়া অন্য কোন মাধ্যমে যোগাযোগ করলে তা গ্রহণযোগ্য হবে না । হোয়াটসঅ্যাপে যোগাযোগ করতে হলে এজেন্ট লিস্টে হোয়াটসঅ্যাপ আইকন উপরে ক্লিক করুন অথবা ফোন নাম্বারটা মোবাইলে সেভ করে তাকে হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারবেন হোয়াটসঅ্যাপ অ্যাপটি আপনার মোবাইলে আগে থেকেই থাকতে হবে না থাকলে গুগল প্লে থেকে ইন্সটল করে নিন।
          </p>
        </div>
      </div>

      {/* Modals */}
      {showReportModal && selectedAgent && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => {
            setShowReportModal(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
        />
      )}

      {showViewModal && selectedAgent && (
        <ViewAgentModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
        />
      )}
    </div>
  );
};

export default Home;