import { openai } from "@ai-sdk/openai";

export const OPENAI_CHAT_MODELS = [
	"gpt-5.4",
	"gpt-5.4-mini",
	"gpt-5.4-nano",
	"gpt-5",
	"gpt-5-mini",
	"gpt-5-nano",
	"gpt-4.1",
	"gpt-4.1-mini",
	"gpt-4.1-nano",
	"gpt-4o",
	"gpt-4o-mini",
] as const;

export type OpenAIChatModel = (typeof OPENAI_CHAT_MODELS)[number];

export const DEFAULT_MODEL: OpenAIChatModel = "gpt-5.4-mini";

export const REASONING_EFFORTS = [
	"none",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
] as const;

export type ReasoningEffort = (typeof REASONING_EFFORTS)[number];

export const TEXT_VERBOSITIES = ["low", "medium", "high"] as const;

export type TextVerbosity = (typeof TEXT_VERBOSITIES)[number];

export type ChatModelOptions = {
	model?: OpenAIChatModel;
	maxOutputTokens?: number;
	reasoningEffort?: ReasoningEffort;
	textVerbosity?: TextVerbosity;
};

export function supportsReasoningOptions(modelId: string): boolean {
	return (
		modelId.startsWith("gpt-5") ||
		modelId.startsWith("o1") ||
		modelId.startsWith("o3") ||
		modelId.startsWith("o4")
	);
}

function defaultReasoningEffort(modelId: string): ReasoningEffort {
	if (modelId.startsWith("gpt-5.4")) {
		return "none";
	}
	return "minimal";
}

export function getProviderOptions(
	modelId: string,
	options: Pick<ChatModelOptions, "reasoningEffort" | "textVerbosity">,
) {
	if (!supportsReasoningOptions(modelId)) {
		return undefined;
	}

	return {
		openai: {
			reasoningEffort:
				options.reasoningEffort ?? defaultReasoningEffort(modelId),
			textVerbosity: options.textVerbosity ?? "low",
		},
	};
}

export function createChatModel(modelId: string = DEFAULT_MODEL) {
	return openai(modelId);
}

type StreamTextMessagesInput = {
	messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
};

type StreamTextPromptInput = {
	prompt: string;
};

export function buildStreamTextConfig(
	input: (StreamTextMessagesInput | StreamTextPromptInput) & {
		options: ChatModelOptions;
		defaultMaxOutputTokens: number;
	},
) {
	const modelId = input.options.model ?? DEFAULT_MODEL;
	const config: {
		model: ReturnType<typeof createChatModel>;
		maxOutputTokens: number;
		providerOptions?: ReturnType<typeof getProviderOptions>;
		messages?: StreamTextMessagesInput["messages"];
		prompt?: string;
	} = {
		model: createChatModel(modelId),
		maxOutputTokens:
			input.options.maxOutputTokens ?? input.defaultMaxOutputTokens,
	};

	const providerOptions = getProviderOptions(modelId, input.options);
	if (providerOptions) {
		config.providerOptions = providerOptions;
	}

	if ("prompt" in input) {
		config.prompt = input.prompt;
	} else {
		config.messages = input.messages;
	}

	return config;
}
