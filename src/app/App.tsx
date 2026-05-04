import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MoreVertical, Battery, Signal, Wifi, Plus, Smile, Mic, CheckCircle2, MapPin, Clock, Users, Star, Sparkles, Send, Search, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import planAImg from "../imports/plan-a.jpg";
import planBImg from "../imports/plan-b.jpg";
import planCImg from "../imports/plan-c.jpg";

type Page = 1 | 2 | 3 | 4 | 9;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(1);
  const [selectedRequest, setSelectedRequest] = useState("");

  return (
    <div className="w-full bg-white flex flex-col overflow-hidden" style={{ height: '100dvh' }}>
      {/* 状态栏 */}
      <div className="h-11 bg-white px-6 pt-3 flex items-center justify-between text-xs relative z-40 shrink-0 border-b" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-3" />
        </div>
      </div>

      {/* 页面内容 */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 1 && <Page1 key="1" onNext={() => setCurrentPage(2)} />}
          {currentPage === 2 && <Page2 key="2" onNext={() => setCurrentPage(3)} />}
          {currentPage === 3 && <Page3 key="3" onNext={() => setCurrentPage(4)} onBack={() => setCurrentPage(2)} setSelectedRequest={setSelectedRequest} />}
          {currentPage === 4 && <Page4 key="4" onNext={() => setCurrentPage(9)} onBack={() => setCurrentPage(3)} selectedRequest={selectedRequest} />}
          {currentPage === 9 && <Page9 key="9" onBack={() => setCurrentPage(4)} selectedRequest={selectedRequest} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 页面1：手机桌面
function Page1({ onNext }: { onNext: () => void }) {
  const apps = [
    { name: "消息", icon: "💬", color: "bg-green-500" },
    { name: "通讯录", icon: "👥", color: "bg-orange-500" },
    { name: "QQ", icon: "🐧", color: "bg-gradient-to-br from-blue-400 to-blue-600", highlight: true },
    { name: "微信", icon: "💚", color: "bg-green-600" },
    { name: "相机", icon: "📷", color: "bg-gray-600" },
    { name: "照片", icon: "🖼️", color: "bg-blue-500" },
    { name: "设置", icon: "⚙️", color: "bg-gray-500" },
    { name: "App Store", icon: "🛍️", color: "bg-blue-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-6 pt-16"
    >
      <div className="grid grid-cols-4 gap-6">
        {apps.map((app, index) => (
          <motion.button
            key={app.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={app.highlight ? onNext : undefined}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg ${app.highlight ? 'ring-4 ring-yellow-300 ring-offset-2 animate-pulse' : ''}`}>
              {app.icon}
            </div>
            <span className="text-xs text-white font-medium drop-shadow">{app.name}</span>
          </motion.button>
        ))}
      </div>

      {/* 提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-32 left-0 right-0 text-center"
      >
        <div className="inline-block bg-black/50 backdrop-blur px-6 py-3 rounded-full text-white text-sm">
          点击 QQ 图标进入
        </div>
      </motion.div>
    </motion.div>
  );
}

// 页面2：QQ首页（聊天列表）
function Page2({ onNext }: { onNext: () => void }) {
  const [showAgentInput, setShowAgentInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const chats = [
    {
      name: "Cos Agent 🤖",
      avatar: "✨",
      message: "正在为你分析群聊记录和好友空间...",
      time: "刚刚",
      unread: 1,
      isAgent: true
    },
    {
      name: "杭州cp32漫展群1",
      avatar: "🎭",
      message: "接毛，日系清透，5月有档期",
      time: "14:32",
      unread: 3,
      highlight: true
    },
    {
      name: "小樱Sakura",
      avatar: "👩",
      message: "最近在做日系清透风格~",
      time: "昨天",
      unread: 0
    },
    {
      name: "光影摄影",
      avatar: "📷",
      message: "6月档期已开放预约",
      time: "昨天",
      unread: 0
    },
    {
      name: "星辰后勤",
      avatar: "📦",
      message: "道具租赁8折优惠中",
      time: "2天前",
      unread: 0
    },
    {
      name: "修图工作室",
      avatar: "🎨",
      message: "[图片] 最新修图作品",
      time: "3天前",
      unread: 0
    },
    {
      name: "设计小站",
      avatar: "📄",
      message: "作品集排版限时特惠",
      time: "3天前",
      unread: 0
    },
  ];

  const photoRequests = [
    "我想出芙宁娜，北京6月，日系清透风格",
    "我想出甘雨，上海5月，古风仙气感",
    "我想出雷电将军，广州7月，霸气御姐风",
  ];

  const handleSelectRequest = (request: string) => {
    setInputValue(request);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setShowAgentInput(false);
      setInputValue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-[#f5f5f5] relative"
    >
      {/* 顶部导航 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">消息</h1>
        <div className="flex gap-4">
          <Plus className="w-6 h-6" />
          <Search className="w-6 h-6" />
        </div>
      </div>

      {/* 聊天列表 */}
      <div className="flex-1 overflow-auto">
        {chats.map((chat, index) => (
          <motion.div
            key={chat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={chat.highlight ? onNext : undefined}
            className={`border-b px-4 py-3 flex items-center gap-3 active:bg-gray-50 ${
              chat.highlight ? 'bg-white ring-2 ring-blue-400 ring-inset' :
              chat.isAgent ? 'bg-gradient-to-r from-purple-50 to-pink-50' :
              'bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${
              chat.isAgent ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-blue-600'
            }`}>
              {chat.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-600 truncate">{chat.message}</p>
            </div>
            {chat.unread > 0 && (
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                chat.isAgent ? 'bg-purple-500' : 'bg-red-500'
              }`}>
                {chat.unread}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Agent浮动按钮 */}
      {!showAgentInput && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowAgentInput(true)}
          className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.button>
      )}

      {/* Agent输入弹窗 */}
      {showAgentInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-3 right-3 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-4 z-20"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">Cos Agent 🤖</h3>
              <p className="text-xs text-gray-500">智能正片约拍助手</p>
            </div>
            <button onClick={() => setShowAgentInput(false)} className="text-gray-400">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5 mb-3 max-h-28 overflow-y-auto">
            {photoRequests.map((request, index) => (
              <button
                key={index}
                onClick={() => handleSelectRequest(request)}
                className="w-full px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-all"
              >
                <p className="text-[11px] text-gray-600">{request}</p>
              </button>
            ))}
          </div>

          <input
            type="text"
            value={inputValue}
            readOnly
            placeholder="请输入你的约拍需求……"
            className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm mb-3 outline-none cursor-default"
          />

          <button
            onClick={handleSubmit}
            disabled={!inputValue}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            开始正片匹配
          </button>
        </motion.div>
      )}

      {/* 底部导航 */}
      <div className="bg-white border-t px-6 py-2 flex justify-around" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {["消息", "通讯录", "动态", "我"].map((tab, i) => (
          <div key={tab} className="flex flex-col items-center py-2">
            <MessageCircle className={`w-6 h-6 ${i === 0 ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${i === 0 ? 'text-blue-500' : 'text-gray-600'}`}>{tab}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// 页面3：QQ群聊页面
function Page3({ onNext, onBack, setSelectedRequest }: { onNext: () => void; onBack: () => void; setSelectedRequest: (request: string) => void }) {
  const [showAgentInput, setShowAgentInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const messages = [
    { user: "Coser-小月", avatar: "🌙", content: "求场照！明日方舟阿米娅，上海漫展5月4日", isMe: false, highlight: true },
    { user: "摄影-阿光", avatar: "📷", content: "可以拍，我在现场，免费场照", isMe: false },
    { user: "Coser-星野", avatar: "⭐", content: "找场照摄影！原神宵宫，北京CP30，6月1日", isMe: false, highlight: true },
    { user: "后期-修图坊", avatar: "🎨", content: "场照后期精修，20/张", isMe: false },
    { user: "Coser-樱花", avatar: "🌸", content: "约场照📷 崩铁黄泉，广州萤火虫，7月", isMe: false, highlight: true },
    { user: "妆娘-小樱", avatar: "💄", content: "现场可以补妆哦~", isMe: false },
  ];

  const eventRequests = [
    "我想约场照，芙宁娜，cp32 2期，5月4日",
    "我想约场照，宵宫，cp32 1期，5月1日",
    "我想约场照，黄泉，cp32 2期，5月5日",
  ];

  const handleSelectRequest = (request: string) => {
    setInputValue(request);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setSelectedRequest(inputValue);
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-[#f5f5f5] relative"
    >
      {/* 顶部 */}
      <div className="bg-white px-3 py-2 flex items-center gap-3 border-b">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">杭州cp32漫展群1</h1>
          <p className="text-xs text-gray-500">(23)</p>
        </div>
        <MoreVertical className="w-5 h-5" />
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-auto px-3 py-4 space-y-3 pb-20">
        {messages.map((msg, index) => (
          <div key={index} className="flex gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {msg.avatar}
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">{msg.user}</p>
              <div className={`rounded-lg rounded-tl-none px-3 py-2 shadow-sm max-w-[220px] ${
                msg.highlight ? 'bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200' : 'bg-white'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agent浮动按钮 */}
      {!showAgentInput && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowAgentInput(true)}
          className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.button>
      )}

      {/* Agent侧边栏 */}
      {showAgentInput && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAgentInput(false)}
            className="absolute inset-0 bg-black/30 z-20"
          />

          {/* 侧边栏内容 */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-30 flex flex-col"
          >
            {/* 头部 */}
            <div className="flex items-center gap-2 p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <button onClick={() => setShowAgentInput(false)} className="text-gray-600">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Cos Agent 🤖</h3>
                <p className="text-xs text-gray-500">智能场照约拍助手</p>
              </div>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-xs text-gray-500 mb-2">推荐需求</p>
              <div className="space-y-1.5 mb-4">
                {eventRequests.map((request, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectRequest(request)}
                    className="w-full px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-all"
                  >
                    <p className="text-[11px] text-gray-600">{request}</p>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={inputValue}
                readOnly
                placeholder="请输入你的约拍需求……"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm outline-none cursor-default"
              />
            </div>

            {/* 底部按钮 */}
            <div className="p-4 border-t">
              <button
                onClick={handleSubmit}
                disabled={!inputValue}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                开始场照匹配
              </button>
            </div>
          </motion.div>
        </>
      )}

      {/* 输入框 */}
      <div className="bg-white border-t px-3 py-2 flex items-center gap-3" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <Mic className="w-5 h-5 text-gray-600" />
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-400">
          说点什么...
        </div>
        <Smile className="w-5 h-5 text-gray-600" />
        <Plus className="w-5 h-5 text-gray-600" />
      </div>
    </motion.div>
  );
}

// 页面4：Agent对话界面
function Page4({ onNext, onBack, selectedRequest }: { onNext: () => void; onBack: () => void; selectedRequest: string }) {
  const [step, setStep] = useState(0);
  const [makeupStyle, setMakeupStyle] = useState("");
  const [photoStyle, setPhotoStyle] = useState("");
  const [postStyle, setPostStyle] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [progress, setProgress] = useState(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // 提取角色名称
  const getCharacterName = () => {
    if (selectedRequest.includes("芙宁娜")) return "芙宁娜";
    if (selectedRequest.includes("宵宫")) return "宵宫";
    if (selectedRequest.includes("黄泉")) return "黄泉";
    return "芙宁娜";
  };

  // 解析日期
  const getShootingDate = () => {
    if (selectedRequest.includes("5月4日")) {
      return { date: "5.4", time: "下午1:00", photoTime: "下午2:00-2:30" };
    } else if (selectedRequest.includes("5月1日")) {
      return { date: "5.1", time: "下午1:00", photoTime: "下午2:00-2:30" };
    } else if (selectedRequest.includes("5月5日")) {
      return { date: "5.5", time: "下午1:00", photoTime: "下午2:00-2:30" };
    }
    return { date: "5.5", time: "下午1:00", photoTime: "下午2:00-2:30" };
  };

  const characterName = getCharacterName();
  const shootingDate = getShootingDate();

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, showDetail]);

  React.useEffect(() => {
    // 进度条动画
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => setStep(1), 2000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleMakeupSelect = (style: string) => {
    setMakeupStyle(style);
    setTimeout(() => setStep(2), 500);
  };

  const handlePhotoSelect = (style: string) => {
    setPhotoStyle(style);
    setTimeout(() => setStep(3), 500);
  };

  const handlePostSelect = (style: string) => {
    setPostStyle(style);
    setTimeout(() => setStep(4), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-[#f5f5f5]"
    >
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 flex items-center gap-3 border-b border-purple-100">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">Cos Agent 🤖</h1>
          <p className="text-xs text-gray-500">智能约拍助手</p>
        </div>
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 px-3 py-4 overflow-auto">
        <div className="space-y-3">
          {/* 用户消息 */}
          <div className="flex justify-end">
            <div className="bg-[#1890ff] rounded-lg rounded-tr-none px-3 py-2 shadow-sm max-w-[220px]">
              <p className="text-sm text-white">{selectedRequest || "我想约场照，芙宁娜，cp32 2期，5月4日"}</p>
            </div>
          </div>

          {/* Agent分析中 */}
          <div className="flex gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
              <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                <p className="text-sm mb-3">正在为你分析群聊记录和好友空间内容...</p>
                <div className="space-y-2">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {progress >= 100 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        已扫描本群消息 + 6位好友空间
                      </>
                    ) : (
                      <span>扫描中... {progress}%</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 询问妆娘风格 */}
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                  <p className="text-sm mb-2">妆娘风格想要？</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMakeupSelect("自然感")}
                      disabled={makeupStyle !== ""}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      自然感
                    </button>
                    <button
                      onClick={() => handleMakeupSelect("正片妆")}
                      disabled={makeupStyle !== ""}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      正片妆
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 用户选择妆娘风格 */}
          {makeupStyle && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <div className="bg-[#1890ff] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                <p className="text-sm text-white">{makeupStyle}</p>
              </div>
            </motion.div>
          )}

          {/* 询问摄影风格 */}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                  <p className="text-sm mb-2">摄影风格想要？</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handlePhotoSelect("日系透亮")}
                      disabled={photoStyle !== ""}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      日系透亮
                    </button>
                    <button
                      onClick={() => handlePhotoSelect("张力拉满")}
                      disabled={photoStyle !== ""}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      张力拉满
                    </button>
                    <button
                      onClick={() => handlePhotoSelect("暗调质感")}
                      disabled={photoStyle !== ""}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      暗调质感
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 用户选择摄影风格 */}
          {photoStyle && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <div className="bg-[#1890ff] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                <p className="text-sm text-white">{photoStyle}</p>
              </div>
            </motion.div>
          )}

          {/* 询问后期风格 */}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                  <p className="text-sm mb-2">后期风格想要？</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePostSelect("快速出图")}
                      disabled={postStyle !== ""}
                      className="px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      快速出图
                    </button>
                    <button
                      onClick={() => handlePostSelect("精修高质")}
                      disabled={postStyle !== ""}
                      className="px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg text-xs font-medium disabled:opacity-50 transition-all"
                    >
                      精修高质
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 用户选择后期风格 */}
          {postStyle && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <div className="bg-[#1890ff] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                <p className="text-sm text-white">{postStyle}</p>
              </div>
            </motion.div>
          )}

          {/* 展示推荐方案 */}
          {step >= 4 && !showDetail && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm mb-3">
                  <p className="text-sm">已为你匹配3套方案👇</p>
                </div>

                {/* 方案A - 可点击 */}
                <button
                  onClick={() => setShowDetail(true)}
                  className="w-full bg-white rounded-xl shadow-lg overflow-hidden text-left mb-3 hover:shadow-xl transition-shadow"
                >
                  <ImageWithFallback
                    src={planAImg}
                    alt="方案A"
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm">方案A（性价比）</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">95% 匹配</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mb-2">
                      <p>💄 妆娘: {makeupStyle}</p>
                      <p>📸 摄影: {photoStyle}</p>
                      <p>🎨 后期: {postStyle}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">¥300</span>
                      <span className="text-xs text-gray-500">点击查看详情 →</span>
                    </div>
                  </div>
                </button>

                {/* 方案B - 不可点击 */}
                <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden mb-3 opacity-75">
                  <ImageWithFallback
                    src={planBImg}
                    alt="方案B"
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm">方案B（高质量）</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">88% 匹配</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mb-2">
                      <p>💄 妆娘: 精致华丽</p>
                      <p>📸 摄影: 摄影棚</p>
                      <p>🎨 后期: 专业精修</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-600">¥800</span>
                      <span className="text-xs text-gray-400">暂不支持</span>
                    </div>
                  </div>
                </div>

                {/* 方案C - 不可点击 */}
                <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
                  <ImageWithFallback
                    src={planCImg}
                    alt="方案C"
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm">方案C（推荐）</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">90% 匹配</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mb-2">
                      <p>💄 妆娘: 还原度高</p>
                      <p>📸 摄影: 外景拍摄</p>
                      <p>🎨 后期: 自然调色</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-600">¥500</span>
                      <span className="text-xs text-gray-400">暂不支持</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 展示详情 */}
          {showDetail && step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-xl px-4 py-3 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm">📋 方案详情</h3>

                  {/* 团队成员 */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">团队成员</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span>👩</span>
                        <span>小樱Sakura - 妆娘</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>📷</span>
                        <span>光影摄影 - 摄影师</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>📦</span>
                        <span>星辰后勤 - 后勤</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />
                        <span>4.7</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>🎨</span>
                        <span>修图工作室 - 后期</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>📄</span>
                        <span>设计小站 - 排版</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* 拍摄安排 */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">拍摄安排</p>
                    <div className="space-y-1 text-xs">
                      <p>📍 地点: 杭州CP32</p>
                      <p>💄 妆娘: {shootingDate.date} {shootingDate.time}</p>
                      <p>📸 摄影: {shootingDate.date} {shootingDate.photoTime}</p>
                      <p>📦 后勤: {shootingDate.date} 12:00-17:00</p>
                      <p>💰 总费用: <span className="font-bold text-purple-600">¥300</span></p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(5)}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium"
                  >
                    确认组队
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 组队成功 */}
          {step >= 5 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Cos Agent</p>
                <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-sm mb-3">✅ 已为你创建约拍群</p>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl">
                        🎭
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{characterName}场照小队</h3>
                        <p className="text-xs text-gray-500">(7人)</p>
                      </div>
                    </div>
                    <div className="flex -space-x-2 mb-3">
                      {["🙋", "👩", "📷", "📦", "🎨", "📄", "🤖"].map((emoji, i) => (
                        <div key={i} className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-xs border-2 border-white">
                          {emoji}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={onNext}
                      className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium"
                    >
                      进入群聊
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入框 */}
      <div className="bg-white border-t px-3 py-2 flex items-center gap-3" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <Mic className="w-5 h-5 text-gray-600" />
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-400">
          说点什么...
        </div>
        <Smile className="w-5 h-5 text-gray-600" />
        <Plus className="w-5 h-5 text-gray-600" />
      </div>
    </motion.div>
  );
}
// 页面9：新群聊
function Page9({ onBack, selectedRequest }: { onBack: () => void; selectedRequest: string }) {
  // 提取角色名称
  const getCharacterName = () => {
    if (selectedRequest.includes("芙宁娜")) return "芙宁娜";
    if (selectedRequest.includes("宵宫")) return "宵宫";
    if (selectedRequest.includes("黄泉")) return "黄泉";
    return "芙宁娜";
  };

  // 解析日期
  const getShootingDate = () => {
    if (selectedRequest.includes("5月4日")) {
      return { date: "5.4", time: "下午1:00", photoTime: "下午2:00-2:30" };
    } else if (selectedRequest.includes("5月1日")) {
      return { date: "5.1", time: "下午1:00", photoTime: "下午2:00-2:30" };
    } else if (selectedRequest.includes("5月5日")) {
      return { date: "5.5", time: "下午1:00", photoTime: "下午2:00-2:30" };
    }
    return { date: "5.5", time: "下午1:00", photoTime: "下午2:00-2:30" };
  };

  const characterName = getCharacterName();
  const shootingDate = getShootingDate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-[#f5f5f5]"
    >
      <div className="bg-white px-3 py-2 flex items-center gap-3 border-b">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">{characterName}场照小队</h1>
          <p className="text-xs text-gray-500">(7)</p>
        </div>
        <MoreVertical className="w-5 h-5" />
      </div>

      <div className="flex-1 px-3 py-4 overflow-auto">
        <div className="flex gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Cos Agent 🤖</p>
            <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm mb-2">
              <p className="text-sm">已为大家生成拍摄计划</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 shadow-lg">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                拍摄计划
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-pink-500 mt-0.5" />
                  <div>
                    <p className="text-gray-600">拍摄地点</p>
                    <p className="font-semibold">杭州CP32</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-1">时间安排</p>
                    <div className="space-y-1 text-xs">
                      <p>💄 妆娘: {shootingDate.date} {shootingDate.time}</p>
                      <p>📸 摄影: {shootingDate.date} {shootingDate.photoTime}</p>
                      <p>📦 后勤: {shootingDate.date} 12:00-17:00</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">成员分工</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>👩</span>
                        <span className="text-xs">小樱Sakura - 妆娘</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>📷</span>
                        <span className="text-xs">光影摄影 - 摄影师</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>📦</span>
                        <span className="text-xs">星辰后勤 - 后勤</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>🎨</span>
                        <span className="text-xs">修图工作室 - 后期</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>📄</span>
                        <span className="text-xs">设计小站 - 排版</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                        <span>🙋</span>
                        <span className="text-xs">你 - Coser</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 mt-3">
                  <p className="text-xs text-gray-500 mb-2">总费用</p>
                  <p className="text-2xl font-bold text-purple-600">¥300</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium">
                确认计划
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t px-3 py-2 flex items-center gap-3" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <Mic className="w-5 h-5 text-gray-600" />
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-400">
          说点什么...
        </div>
        <Smile className="w-5 h-5 text-gray-600" />
        <Plus className="w-5 h-5 text-gray-600" />
      </div>
    </motion.div>
  );
}
