import integration from "./integration.js";

export type { AstroChattyOptions } from "./integration.js";
export type {
	ChatModelOptions,
	OpenAIChatModel,
	ReasoningEffort,
	TextVerbosity,
} from "./openai-chat.js";
export {
	DEFAULT_MODEL,
	OPENAI_CHAT_MODELS,
	REASONING_EFFORTS,
	TEXT_VERBOSITIES,
} from "./openai-chat.js";

export default integration;
