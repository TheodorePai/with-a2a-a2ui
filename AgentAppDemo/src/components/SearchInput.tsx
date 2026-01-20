import { useState } from "react";
import { Send, Mic, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

type InputMode = "voice" | "keyboard";

// 声波动画组件
function VoiceWaveAnimation() {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-[3px] bg-primary rounded-full animate-voice-wave"
          style={{
            animationDelay: `${i * 0.1}s`,
            height: '100%',
          }}
        />
      ))}
    </div>
  );
}

export function SearchInput({ onSearch, isLoading, placeholder = "纽约排名前5的中餐馆" }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
    // 语音识别逻辑占位
  };

  const handleVoiceEnd = () => {
    setIsRecording(false);
    // 模拟语音输入结果
    const mockVoiceResult = "北京烤鸭餐厅推荐";
    setQuery(mockVoiceResult);
    onSearch(mockVoiceResult);
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === "voice" ? "keyboard" : "voice");
  };

  return (
    <div className="w-full max-w-md px-4">
      {inputMode === "voice" ? (
        /* 语音模式 */
        <div 
          className={`flex items-center py-3 px-4 card-glass rounded-full transition-all duration-300 ${
            isRecording 
              ? "bg-primary/15 border-primary/50 shadow-[0_0_24px_rgba(139,92,246,0.25)]" 
              : ""
          }`}
        >
          <div 
            className="flex-1 flex items-center justify-center cursor-pointer select-none gap-2"
            onTouchStart={handleVoiceStart}
            onTouchEnd={handleVoiceEnd}
            onMouseDown={handleVoiceStart}
            onMouseUp={handleVoiceEnd}
            onMouseLeave={() => isRecording && setIsRecording(false)}
          >
            {isRecording ? (
              <>
                <VoiceWaveAnimation />
                <span className="text-sm text-primary font-medium ml-2">松开发送</span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">按住说话</span>
              </>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary ml-2"
            onClick={toggleInputMode}
            disabled={isLoading}
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        /* 键盘输入模式 */
        <form onSubmit={handleSubmit} className="flex items-center py-2 pl-4 pr-2 card-glass rounded-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
            disabled={isLoading}
            autoFocus
          />
          <div className="flex items-center gap-1 ml-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              onClick={toggleInputMode}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="btn-primary-gradient rounded-full h-9 w-9 flex-shrink-0"
              disabled={isLoading || !query.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
