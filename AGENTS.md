Vercel design system for building consistent web experiences.# Artifact

The `Artifact` component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.

<Preview path="artifact" />

## Installation

```sh
npx ai-elements@latest add artifact
```

## Usage

```tsx
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '@/components/ai-elements/artifact';
```

```tsx
<Artifact>
  <ArtifactHeader>
    <div>
      <ArtifactTitle>Dijkstra's Algorithm Implementation</ArtifactTitle>
      <ArtifactDescription>Updated 1 minute ago</ArtifactDescription>
    </div>
    <ArtifactActions>
      <ArtifactAction icon={CopyIcon} label="Copy" tooltip="Copy to clipboard" />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    {/* Your content here */}
  </ArtifactContent>
</Artifact>
```

## Features

- Structured container with header and content areas
- Built-in header with title and description support
- Flexible action buttons with tooltips
- Customizable styling for all subcomponents
- Support for close buttons and action groups
- Clean, modern design with border and shadow
- Responsive layout that adapts to content
- TypeScript support with proper type definitions
- Composable architecture for maximum flexibility

## Examples

### With Code Display

<Preview path="artifact" />

## Props

### `<Artifact />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description:
        'Any other props are spread to the underlying div element.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactHeader />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description:
        'Any other props are spread to the underlying div element.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactTitle />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLParagraphElement>',
      description:
        'Any other props are spread to the underlying paragraph element.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactDescription />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLParagraphElement>',
      description:
        'Any other props are spread to the underlying paragraph element.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactActions />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description:
        'Any other props are spread to the underlying div element.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactAction />`

<PropertiesTable
  content={[
    {
      name: 'tooltip',
      type: 'string',
      description: 'Tooltip text to display on hover.',
      isOptional: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Screen reader label for the action button.',
      isOptional: true,
    },
    {
      name: 'icon',
      type: 'LucideIcon',
      description: 'Lucide icon component to display in the button.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactClose />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
      isOptional: true,
    },
  ]}
/>

### `<ArtifactContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description:
        'Any other props are spread to the underlying div element.',
      isOptional: true,
    },
  ]}
/>
# Chain of Thought

The `ChainOfThought` component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. It helps users understand how AI arrives at conclusions.

<Preview path="chain-of-thought" />

## Installation

```sh
npx ai-elements@latest add chain-of-thought
```

## Usage

```tsx
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought';
```

```tsx
<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={SearchIcon}
      label="Searching for information"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Result 1
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>
```

## Features

- Collapsible interface with smooth animations powered by Radix UI
- Step-by-step visualization of AI reasoning process
- Support for different step statuses (complete, active, pending)
- Built-in search results display with badge styling
- Image support with captions for visual content
- Custom icons for different step types
- Context-aware components using React Context API
- Fully typed with TypeScript
- Accessible with keyboard navigation support
- Responsive design that adapts to different screen sizes
- Smooth fade and slide animations for content transitions
- Composable architecture for flexible customization

## Props

### `<ChainOfThought />`

<PropertiesTable
  content={[
    {
      name: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the collapsible.',
      isOptional: true,
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      description:
        'Default open state when uncontrolled. Defaults to false.',
      isOptional: true,
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description:
        'Callback when the open state changes.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description:
        'Any other props are spread to the root div element.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtHeader />`

<PropertiesTable
  content={[
    {
      name: 'children',
      type: 'React.ReactNode',
      description:
        'Custom header text. Defaults to "Chain of Thought".',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleTrigger>',
      description:
        'Any other props are spread to the CollapsibleTrigger component.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtStep />`

<PropertiesTable
  content={[
    {
      name: 'icon',
      type: 'LucideIcon',
      description:
        'Icon to display for the step. Defaults to DotIcon.',
      isOptional: true,
    },
    {
      name: 'label',
      type: 'string',
      description:
        'The main text label for the step.',
      isOptional: false,
    },
    {
      name: 'description',
      type: 'string',
      description:
        'Optional description text shown below the label.',
      isOptional: true,
    },
    {
      name: 'status',
      type: '"complete" | "active" | "pending"',
      description:
        'Visual status of the step. Defaults to "complete".',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description:
        'Any other props are spread to the root div element.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtSearchResults />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description:
        'Any props are spread to the container div element.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtSearchResult />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Badge>',
      description:
        'Any props are spread to the Badge component.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleContent>',
      description:
        'Any props are spread to the CollapsibleContent component.',
      isOptional: true,
    },
  ]}
/>

### `<ChainOfThoughtImage />`

<PropertiesTable
  content={[
    {
      name: 'caption',
      type: 'string',
      description:
        'Optional caption text displayed below the image.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description:
        'Any other props are spread to the container div element.',
      isOptional: true,
    },
  ]}
/>
# Code Block

The `CodeBlock` component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.

<Preview path="code-block" />

## Installation

```sh
npx ai-elements@latest add code-block
```

## Usage

```tsx
import { CodeBlock, CodeBlockCopyButton } from '@/components/ai-elements/code-block';
```

```tsx
<CodeBlock data={"console.log('hello world')"} language="jsx">
  <CodeBlockCopyButton
    onCopy={() => console.log('Copied code to clipboard')}
    onError={() => console.error('Failed to copy code to clipboard')}
  />
</CodeBlock>
```

## Usage with AI SDK

Build a simple code generation tool using the [`experimental_useObject`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-object) hook.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { codeBlockSchema } from '@/app/api/codegen/route';
import {
  Input,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const { object, submit, isLoading } = useObject({
    api: '/api/codegen',
    schema: codeBlockSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      submit(input);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto mb-4">
          {object?.code && object?.language && (
            <CodeBlock
              code={object.code}
              language={object.language}
              showLineNumbers={true}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          )}
        </div>

        <Input
          onSubmit={handleSubmit}
          className="mt-4 w-full max-w-2xl mx-auto relative"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Generate a React todolist component"
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={isLoading ? 'streaming' : 'ready'}
            disabled={!input.trim()}
            className="absolute bottom-1 right-1"
          />
        </Input>
      </div>
    </div>
  );
}
```

Add the following route to your backend:

```tsx filename="api/codegen/route.ts"
import { streamObject } from 'ai';
import { z } from 'zod';

export const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: 'openai/gpt-4o',
    schema: codeBlockSchema,
    prompt:
      `You are a helpful coding assistant. Only generate code, no markdown formatting or backticks, or text.` +
      context,
  });

  return result.toTextStreamResponse();
}
```

## Features

- Syntax highlighting with react-syntax-highlighter
- Line numbers (optional)
- Copy to clipboard functionality
- Automatic light/dark theme switching
- Customizable styles
- Accessible design

## Examples

### Dark Mode

To use the `CodeBlock` component in dark mode, you can wrap it in a `div` with the `dark` class.

<Preview path="code-block-dark" />

## Props

### `<CodeBlock />`

<PropertiesTable
  content={[
    {
      name: 'code',
      type: 'string',
      description: 'The code content to display.',
    },
    {
      name: 'language',
      type: 'string',
      description: 'The programming language for syntax highlighting.',
    },
    {
      name: 'showLineNumbers',
      type: 'boolean',
      description: 'Whether to show line numbers. Default: false.',
      isOptional: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description:
        'Child elements (like CodeBlockCopyButton) positioned in the top-right corner.',
      isOptional: true,
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes to apply to the root container.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the root div.',
      isOptional: true,
    },
  ]}
/>

### `<CodeBlockCopyButton />`

<PropertiesTable
  content={[
    {
      name: 'onCopy',
      type: '() => void',
      description: 'Callback fired after a successful copy.',
      isOptional: true,
    },
    {
      name: 'onError',
      type: '(error: Error) => void',
      description: 'Callback fired if copying fails.',
      isOptional: true,
    },
    {
      name: 'timeout',
      type: 'number',
      description: 'How long to show the copied state (ms). Default: 2000.',
      isOptional: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description:
        'Custom content for the button. Defaults to copy/check icons.',
      isOptional: true,
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes to apply to the button.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
      isOptional: true,
    },
  ]}
/>
# Conversation

The `Conversation` component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.

<Preview path="conversation" className="p-0" />

## Installation

```sh
npx ai-elements@latest add conversation
```

## Usage

```tsx
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
```

```tsx
<Conversation className="relative w-full" style={{ height: '500px' }}>
  <ConversationContent>
    {messages.length === 0 ? (
      <ConversationEmptyState
        icon={<MessageSquare className="size-12" />}
        title="No messages yet"
        description="Start a conversation to see messages here"
      />
    ) : (
      messages.map((message) => (
        <Message from={message.from} key={message.id}>
          <MessageContent>{message.content}</MessageContent>
        </Message>
      ))
    )}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
```

## Usage with AI SDK

Build a simple conversational UI with `Conversation` and [`PromptInput`](/elements/components/prompt-input):

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  Input,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';

const ConversationDemo = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="Start a conversation"
                description="Type a message below to begin chatting"
              />
            ) : (
              messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text': // we don't use any reasoning or tool calls in this example
                          return (
                            <Response key={`${message.id}-${i}`}>
                              {part.text}
                            </Response>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <Input
          onSubmit={handleSubmit}
          className="mt-4 w-full max-w-2xl mx-auto relative"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status === 'streaming' ? 'streaming' : 'ready'}
            disabled={!input.trim()}
            className="absolute bottom-1 right-1"
          />
        </Input>
      </div>
    </div>
  );
};

export default ConversationDemo;
```

Add the following route to your backend:

```tsx filename="api/chat/route.ts"
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

## Features

- Automatic scrolling to the bottom when new messages are added
- Smooth scrolling behavior with configurable animation
- Scroll button that appears when not at the bottom
- Responsive design with customizable padding and spacing
- Flexible content layout with consistent message spacing
- Accessible with proper ARIA roles for screen readers
- Customizable styling through className prop
- Support for any number of child message components

## Props

### `<Conversation />`

<PropertiesTable
  content={[
    {
      name: 'contextRef',
      type: 'React.Ref<StickToBottomContext>',
      description: 'Optional ref to access the StickToBottom context object.',
    },
    {
      name: 'instance',
      type: 'StickToBottomInstance',
      description:
        'Optional instance for controlling the StickToBottom component.',
    },
    {
      name: 'children',
      type: '((context: StickToBottomContext) => ReactNode) | ReactNode',
      description:
        'Render prop or ReactNode for custom rendering with context.',
    },
    {
      name: '[...props]',
      type: 'Omit<React.HTMLAttributes<HTMLDivElement>, "children">',
      description: 'Any other props are spread to the root div.',
    },
  ]}
/>

### `<ConversationContent />`

<PropertiesTable
  content={[
    {
      name: 'children',
      type: '((context: StickToBottomContext) => ReactNode) | ReactNode',
      description:
        'Render prop or ReactNode for custom rendering with context.',
    },
    {
      name: '[...props]',
      type: 'Omit<React.HTMLAttributes<HTMLDivElement>, "children">',
      description: 'Any other props are spread to the root div.',
    },
  ]}
/>

### `<ConversationEmptyState />`

<PropertiesTable
  content={[
    {
      name: 'title',
      type: 'string',
      description:
        'The title text to display. Defaults to "No messages yet".',
    },
    {
      name: 'description',
      type: 'string',
      description:
        'The description text to display. Defaults to "Start a conversation to see messages here".',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      description: 'Optional icon to display above the text.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Optional additional content to render below the text.',
    },
    {
      name: '[...props]',
      type: 'ComponentProps<"div">',
      description: 'Any other props are spread to the root div.',
    },
  ]}
/>

### `<ConversationScrollButton />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
    },
  ]}
/>
# Loader

The `Loader` component provides a spinning animation to indicate loading states in your AI applications. It includes both a customizable wrapper component and the underlying icon for flexible usage.

<Preview path="loader" />

## Installation

```sh
npx ai-elements@latest add loader
```

## Usage

```tsx
import { Loader } from '@/components/ai-elements/loader';
```

```tsx
<Loader />
```

## Usage with AI SDK

Build a simple chat app that displays a loader before it the response streans by using `status === "submitted"`.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  Input,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

const LoaderDemo = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <div key={`${message.id}-${i}`}>{part.text}</div>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <Input
          onSubmit={handleSubmit}
          className="mt-4 w-full max-w-2xl mx-auto relative"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status === 'streaming' ? 'streaming' : 'ready'}
            disabled={!input.trim()}
            className="absolute bottom-1 right-1"
          />
        </Input>
      </div>
    </div>
  );
};

export default LoaderDemo;
```

Add the following route to your backend:

```ts filename="app/api/chat/route.ts"
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

## Features

- Clean, modern spinning animation using CSS animations
- Configurable size with the `size` prop
- Customizable styling with CSS classes
- Built-in `animate-spin` animation with proper centering
- Exports both `AILoader` wrapper and `LoaderIcon` for flexible usage
- Supports all standard HTML div attributes
- TypeScript support with proper type definitions
- Optimized SVG icon with multiple opacity levels for smooth animation
- Uses `currentColor` for proper theme integration
- Responsive and accessible design

## Examples

### Different Sizes

<Preview path="loader-sizes" />

### Custom Styling

<Preview path="loader-custom" />

## Props

### `<Loader />`

<PropertiesTable
  content={[
    {
      name: 'size',
      type: 'number',
      description:
        'The size (width and height) of the loader in pixels. Defaults to 16.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the root div.',
      isOptional: true,
    },
  ]}
/>
# Message

The `Message` component displays a chat interface message from either a user or an AI. It includes an avatar, a name, and a message content.

<Preview path="message" />

## Installation

```sh
npx ai-elements@latest add message
```

## Usage

```tsx
import { Message, MessageContent } from '@/components/ai-elements/message';
```

```tsx
// Default contained variant
<Message from="user">
  <MessageContent>Hi there!</MessageContent>
</Message>

// Flat variant for a minimalist look
<Message from="assistant">
  <MessageContent variant="flat">Hello! How can I help you today?</MessageContent>
</Message>
```

## Usage with AI SDK

Render messages in a list with `useChat`.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import { Message, MessageContent } from '@/components/ai-elements/message';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';

const MessageDemo = () => {
  const { messages } = useChat();

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        {messages.map((message) => (
          <Message from={message.role} key={message.id}>
            <MessageContent>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text': // we don't use any reasoning or tool calls in this example
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.text}
                      </Response>
                    );
                  default:
                    return null;
                }
              })}
            </MessageContent>
          </Message>
        ))}
      </div>
    </div>
  );
};

export default MessageDemo;
```

## Features

- Displays messages from both the user and AI assistant with distinct styling.
- Two visual variants: **contained** (default) and **flat** for different design preferences.
- Includes avatar images for message senders with fallback initials.
- Shows the sender's name through avatar fallbacks.
- Automatically aligns user and assistant messages on opposite sides.
- Uses different background colors for user and assistant messages.
- Accepts any React node as message content.

## Variants

### Contained (default)
The **contained** variant provides distinct visual separation with colored backgrounds:
- User messages appear with primary background color and are right-aligned
- Assistant messages have secondary background color and are left-aligned
- Both message types have padding and rounded corners

### Flat
The **flat** variant offers a minimalist design that matches modern AI interfaces like ChatGPT and Gemini:
- User messages use softer secondary colors with subtle borders
- Assistant messages display full-width without background or padding
- Creates a cleaner, more streamlined conversation appearance

## Notes

Always render the `AIMessageContent` first, then the `AIMessageAvatar`. The `AIMessage` component is a wrapper that determines the alignment of the message.

## Examples

### Render Markdown

We can use the [`Response`](/elements/components/response) component to render markdown content.

<Preview path="message-markdown" />

### Flat Variant

The flat variant provides a minimalist design that matches modern AI interfaces.

<Preview path="message-flat" />

## Props

### `<Message />`

<PropertiesTable
  content={[
    {
      name: 'from',
      type: 'UIMessage["role"]',
      description:
        'The role of the message sender ("user", "assistant", or "system").',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the root div.',
      isOptional: true,
    },
  ]}
/>

### `<MessageContent />`

<PropertiesTable
  content={[
    {
      name: 'variant',
      type: '"contained" | "flat"',
      description: 'Visual style variant. "contained" (default) shows colored backgrounds, "flat" provides a minimalist design.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the content div.',
      isOptional: true,
    },
  ]}
/>

### `<MessageAvatar />`

<PropertiesTable
  content={[
    {
      name: 'src',
      type: 'string',
      description: 'The URL of the avatar image.',
      isOptional: false,
    },
    {
      name: 'name',
      type: 'string',
      description:
        'The name to use for the avatar fallback (first 2 letters shown if image is missing).',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Avatar>',
      description:
        'Any other props are spread to the underlying Avatar component.',
      isOptional: true,
    },
  ]}
/>
# Prompt Input

The `PromptInput` component allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.

<Preview path="prompt-input" />

## Installation

```sh
npx ai-elements@latest add prompt-input
```

## Usage

```tsx
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputProvider,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  usePromptInputAttachments,
} from '@/components/ai-elements/prompt-input';
```

```tsx
import { GlobeIcon } from 'lucide-react';

<PromptInput onSubmit={() => {}} className="mt-4 relative">
  <PromptInputBody>
    <PromptInputAttachments>
      {(attachment) => (
        <PromptInputAttachment data={attachment} />
      )}
    </PromptInputAttachments>
    <PromptInputTextarea onChange={(e) => {}} value={''} />
  </PromptInputBody>
  <PromptInputToolbar>
    <PromptInputTools>
      <PromptInputActionMenu>
        <PromptInputActionMenuTrigger />
        <PromptInputActionMenuContent>
          <PromptInputActionAddAttachments />
        </PromptInputActionMenuContent>
      </PromptInputActionMenu>
      <PromptInputSpeechButton />
      <PromptInputButton>
        <GlobeIcon size={16} />
        <span>Search</span>
      </PromptInputButton>
      <PromptInputModelSelect onValueChange={(value) => {}} value="gpt-4o">
        <PromptInputModelSelectTrigger>
          <PromptInputModelSelectValue />
        </PromptInputModelSelectTrigger>
        <PromptInputModelSelectContent>
          <PromptInputModelSelectItem value="gpt-4o">
            GPT-4o
          </PromptInputModelSelectItem>
          <PromptInputModelSelectItem value="claude-opus-4-20250514">
            Claude 4 Opus
          </PromptInputModelSelectItem>
        </PromptInputModelSelectContent>
      </PromptInputModelSelect>
    </PromptInputTools>
    <PromptInputSubmit
      disabled={false}
      status={'ready'}
    />
  </PromptInputToolbar>
</PromptInput>
```

## Usage with AI SDK

Built a fully functional chat app using `PromptInput`, [`Conversation`](/elements/components/conversation) with a model picker:

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { GlobeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';

const models = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'claude-opus-4-20250514', name: 'Claude 4 Opus' },
];

const InputDemo = () => {
  const [text, setText] = useState<string>('');
  const [model, setModel] = useState<string>(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, sendMessage } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      { 
        text: message.text || 'Sent with attachments',
        files: message.files 
      },
      {
        body: {
          model: model,
          webSearch: useWebSearch,
        },
      },
    );
    setText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
              value={text}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputSpeechButton
                onTranscriptionChange={setText}
                textareaRef={textareaRef}
              />
              <PromptInputButton
                onClick={() => setUseWebSearch(!useWebSearch)}
                variant={useWebSearch ? 'default' : 'ghost'}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!text && !status} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default InputDemo;
```

Add the following route to your backend:

```ts filename="app/api/chat/route.ts"
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { 
    model, 
    messages, 
    webSearch 
  }: { 
    messages: UIMessage[]; 
    model: string;
    webSearch?: boolean;
  } = await req.json();

  const result = streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

## Features

- Auto-resizing textarea that adjusts height based on content
- File attachment support with drag-and-drop
- Image preview for image attachments
- Configurable file constraints (max files, max size, accepted types)
- Automatic submit button icons based on status
- Support for keyboard shortcuts (Enter to submit, Shift+Enter for new line)
- Customizable min/max height for the textarea
- Flexible toolbar with support for custom actions and tools
- Built-in model selection dropdown
- Built-in native speech recognition button (Web Speech API)
- Optional provider for lifted state management
- Form automatically resets on submit
- Responsive design with mobile-friendly controls
- Clean, modern styling with customizable themes
- Form-based submission handling
- Hidden file input sync for native form posts
- Global document drop support (opt-in)

## Props

### `<PromptInput />`

<PropertiesTable
  content={[
    {
      name: 'onSubmit',
      type: '(message: PromptInputMessage, event: FormEvent) => void',
      description: 'Handler called when the form is submitted with message text and files.',
      isOptional: false,
    },
    {
      name: 'accept',
      type: 'string',
      description: 'File types to accept (e.g., "image/*"). Leave undefined for any.',
      isOptional: true,
    },
    {
      name: 'multiple',
      type: 'boolean',
      description: 'Whether to allow multiple file selection.',
      isOptional: true,
    },
    {
      name: 'globalDrop',
      type: 'boolean',
      description: 'When true, accepts file drops anywhere on the document.',
      isOptional: true,
    },
    {
      name: 'syncHiddenInput',
      type: 'boolean',
      description: 'Render a hidden input with given name for native form posts.',
      isOptional: true,
    },
    {
      name: 'maxFiles',
      type: 'number',
      description: 'Maximum number of files allowed.',
      isOptional: true,
    },
    {
      name: 'maxFileSize',
      type: 'number',
      description: 'Maximum file size in bytes.',
      isOptional: true,
    },
    {
      name: 'onError',
      type: '(err: { code: "max_files" | "max_file_size" | "accept", message: string }) => void',
      description: 'Handler for file validation errors.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLFormElement>',
      description: 'Any other props are spread to the root form element.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputTextarea />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Textarea>',
      description:
        'Any other props are spread to the underlying Textarea component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputToolbar />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the toolbar div.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputTools />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the tools div.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputButton />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputSubmit />`

<PropertiesTable
  content={[
    {
      name: 'status',
      type: 'ChatStatus',
      description: 'Current chat status to determine button icon (submitted, streaming, error).',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying shadcn/ui Button component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputModelSelect />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Select>',
      description:
        'Any other props are spread to the underlying Select component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputModelSelectTrigger />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof SelectTrigger>',
      description:
        'Any other props are spread to the underlying SelectTrigger component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputModelSelectContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof SelectContent>',
      description:
        'Any other props are spread to the underlying SelectContent component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputModelSelectItem />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof SelectItem>',
      description:
        'Any other props are spread to the underlying SelectItem component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputModelSelectValue />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof SelectValue>',
      description:
        'Any other props are spread to the underlying SelectValue component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputBody />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the body div.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputAttachments />`

<PropertiesTable
  content={[
    {
      name: 'children',
      type: '(attachment: FileUIPart & { id: string }) => React.ReactNode',
      description: 'Render function for each attachment.',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the attachments container.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputAttachment />`

<PropertiesTable
  content={[
    {
      name: 'data',
      type: 'FileUIPart & { id: string }',
      description: 'The attachment data to display.',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the attachment div.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputActionMenu />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof DropdownMenu>',
      description:
        'Any other props are spread to the underlying DropdownMenu component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputActionMenuTrigger />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Button>',
      description:
        'Any other props are spread to the underlying Button component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputActionMenuContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof DropdownMenuContent>',
      description:
        'Any other props are spread to the underlying DropdownMenuContent component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputActionMenuItem />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof DropdownMenuItem>',
      description:
        'Any other props are spread to the underlying DropdownMenuItem component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputActionAddAttachments />`

<PropertiesTable
  content={[
    {
      name: 'label',
      type: 'string',
      description: 'Label for the menu item. Defaults to "Add photos or files".',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof DropdownMenuItem>',
      description:
        'Any other props are spread to the underlying DropdownMenuItem component.',
      isOptional: true,
    },
  ]}
/>

### `<PromptInputProvider />`

<PropertiesTable
  content={[
    {
      name: 'initialInput',
      type: 'string',
      description: 'Initial text input value.',
      isOptional: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Child components that will have access to the provider context.',
      isOptional: false,
    },
  ]}
/>

Optional global provider that lifts PromptInput state outside of PromptInput. When used, it allows you to access and control the input state from anywhere within the provider tree. If not used, PromptInput stays fully self-managed.

### `<PromptInputSpeechButton />`

<PropertiesTable
  content={[
    {
      name: 'textareaRef',
      type: 'RefObject<HTMLTextAreaElement | null>',
      description: 'Reference to the textarea element to insert transcribed text.',
      isOptional: true,
    },
    {
      name: 'onTranscriptionChange',
      type: '(text: string) => void',
      description: 'Callback fired when transcription text changes.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof PromptInputButton>',
      description:
        'Any other props are spread to the underlying PromptInputButton component.',
      isOptional: true,
    },
  ]}
/>

Built-in button component that provides native speech recognition using the Web Speech API. The button will be disabled if speech recognition is not supported in the browser. Displays a microphone icon and pulses while actively listening.

## Hooks

### `usePromptInputAttachments`

Access and manage file attachments within a PromptInput context.

```tsx
const attachments = usePromptInputAttachments();

// Available methods:
attachments.files // Array of current attachments
attachments.add(files) // Add new files
attachments.remove(id) // Remove an attachment by ID
attachments.clear() // Clear all attachments
attachments.openFileDialog() // Open file selection dialog
```

### `usePromptInputController`

Access the full PromptInput controller from a PromptInputProvider. Only available when using the provider.

```tsx
const controller = usePromptInputController();

// Available methods:
controller.textInput.value // Current text input value
controller.textInput.setInput(value) // Set text input value
controller.textInput.clear() // Clear text input
controller.attachments // Same as usePromptInputAttachments
```

### `useProviderAttachments`

Access attachments context from a PromptInputProvider. Only available when using the provider.

```tsx
const attachments = useProviderAttachments();

// Same interface as usePromptInputAttachments
```
# Reasoning

The `Reasoning` component displays AI reasoning content, automatically opening during streaming and closing when finished.

<Preview path="reasoning" />

## Installation

```sh
npx ai-elements@latest add reasoning
```

## Usage

```tsx
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
```

```tsx
<Reasoning className="w-full" isStreaming={false}>
  <ReasoningTrigger />
  <ReasoningContent>I need to computer the square of 2.</ReasoningContent>
</Reasoning>
```

## Usage with AI SDK

Build a chatbot with reasoning using Deepseek R1.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from @/components/ai-elements/response';

const ReasoningDemo = () => {
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4 w-full max-w-2xl mx-auto relative"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status === 'streaming' ? 'streaming' : 'ready'}
            disabled={!input.trim()}
            className="absolute bottom-1 right-1"
          />
        </PromptInput>
      </div>
    </div>
  );
};

export default ReasoningDemo;
```

Add the following route to your backend:

```ts filename="app/api/chat/route.ts"
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model: 'deepseek/deepseek-r1',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
```

## Features

- Automatically opens when streaming content and closes when finished
- Manual toggle control for user interaction
- Smooth animations and transitions powered by Radix UI
- Visual streaming indicator with pulsing animation
- Composable architecture with separate trigger and content components
- Built with accessibility in mind including keyboard navigation
- Responsive design that works across different screen sizes
- Seamlessly integrates with both light and dark themes
- Built on top of shadcn/ui Collapsible primitives
- TypeScript support with proper type definitions

## Props

### `<Reasoning />`

<PropertiesTable
  content={[
    {
      name: 'isStreaming',
      type: 'boolean',
      description:
        'Whether the reasoning is currently streaming (auto-opens and closes the panel).',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Collapsible>',
      description:
        'Any other props are spread to the underlying Collapsible component.',
      isOptional: true,
    },
  ]}
/>

### `<ReasoningTrigger />`

<PropertiesTable
  content={[
    {
      name: 'title',
      type: 'string',
      description:
        'Optional title to display in the trigger (default: "Reasoning").',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleTrigger>',
      description:
        'Any other props are spread to the underlying CollapsibleTrigger component.',
      isOptional: true,
    },
  ]}
/>

### `<ReasoningContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleContent>',
      description:
        'Any other props are spread to the underlying CollapsibleContent component.',
      isOptional: true,
    },
  ]}
/>
# Response

The `Response` component renders a Markdown response from a large language model. It uses [Streamdown](https://streamdown.ai/) under the hood to render the markdown.

<Preview path="response" />

## Installation

```sh
npx ai-elements@latest add response
```

<Note label={false} type="warning">
  **Important:** After adding the component, you'll need to add the following to your `globals.css` file:

  ```css
  @source "../node_modules/streamdown/dist/index.js";
  ```

  This is **required** for the Response component to work properly. Without this import, the Streamdown styles will not be applied to your project. See [Streamdown's documentation](https://streamdown.ai/) for more details.
</Note>

## Usage

```tsx
import { Response } from '@/components/ai-elements/response';
```

```tsx
<Response>**Hi there.** I am an AI model designed to help you.</Response>
```

## Usage with AI SDK

Populate a markdown response with messages from [`useChat`](/docs/reference/ai-sdk-ui/use-chat).

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';

const ResponseDemo = () => {
  const { messages } = useChat();

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text': // we don't use any reasoning or tool calls in this example
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
    </div>
  );
};

export default ResponseDemo;
```

## Features

- Renders markdown content with support for paragraphs, links, and code blocks
- Supports GFM features like tables, task lists, and strikethrough text via remark-gfm
- Supports rendering Math Equations via rehype-katex
- **Smart streaming support** - automatically completes incomplete formatting during real-time text streaming
- Code blocks are rendered with syntax highlighting for various programming languages
- Code blocks include a button to easily copy code to clipboard
- Adapts to different screen sizes while maintaining readability
- Seamlessly integrates with both light and dark themes
- Customizable appearance through className props and Tailwind CSS utilities
- Built with accessibility in mind for all users

## Props

### `<Response />`

<PropertiesTable
  content={[
    {
      name: 'children',
      type: 'string',
      description: 'The markdown content to render.',
    },
    {
      name: 'parseIncompleteMarkdown',
      type: 'boolean',
      description: 'Whether to parse and fix incomplete markdown syntax (e.g., unclosed code blocks or lists).',
      default: 'true',
      isOptional: true,
    },
    {
      name: 'className',
      type: 'string',
      description: 'CSS class names to apply to the wrapper div element.',
      isOptional: true,
    },
    {
      name: 'components',
      type: 'object',
      description: 'Custom React components to use for rendering markdown elements (e.g., custom heading, paragraph, code block components).',
      isOptional: true,
    },
    {
      name: 'allowedImagePrefixes',
      type: 'string[]',
      description: 'Array of allowed URL prefixes for images. Use ["*"] to allow all images.',
      default: '["*"]',
      isOptional: true,
    },
    {
      name: 'allowedLinkPrefixes',
      type: 'string[]',
      description: 'Array of allowed URL prefixes for links. Use ["*"] to allow all links.',
      default: '["*"]',
      isOptional: true,
    },
    {
      name: 'defaultOrigin',
      type: 'string',
      description: 'Default origin to use for relative URLs in links and images.',
      isOptional: true,
    },
    {
      name: 'rehypePlugins',
      type: 'array',
      description: 'Array of rehype plugins to use for processing HTML. Includes KaTeX for math rendering by default.',
      default: '[rehypeKatex]',
      isOptional: true,
    },
    {
      name: 'remarkPlugins',
      type: 'array',
      description: 'Array of remark plugins to use for processing markdown. Includes GitHub Flavored Markdown and math support by default.',
      default: '[remarkGfm, remarkMath]',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      description: 'Any other props are spread to the root div.',
      isOptional: true,
    },
  ]}
/>
# Task

The `Task` component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking. It consists of a main `Task` container with `TaskTrigger` for the clickable header and `TaskContent` for the collapsible content area.

<Preview path="task" />

## Installation

```sh
npx ai-elements@latest add task
```

## Usage

```tsx
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from '@/components/ai-elements/task';
```

```tsx
<Task className="w-full">
  <TaskTrigger title="Found project files" />
  <TaskContent>
    <TaskItem>
      Read <TaskItemFile>index.md</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

## Usage with AI SDK

Build a mock async programming agent using [`experimental_generateObject`](/docs/reference/ai-sdk-ui/use-object).

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import {
  Task,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
  TaskContent,
} from '@/components/ai-elements/task';
import { Button } from '@/components/ui/button';
import { tasksSchema } from '@/app/api/task/route';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiJson,
  SiMarkdown,
} from '@icons-pack/react-simple-icons';

const iconMap = {
  react: { component: SiReact, color: '#149ECA' },
  typescript: { component: SiTypescript, color: '#3178C6' },
  javascript: { component: SiJavascript, color: '#F7DF1E' },
  css: { component: SiCss, color: '#1572B6' },
  html: { component: SiHtml5, color: '#E34F26' },
  json: { component: SiJson, color: '#000000' },
  markdown: { component: SiMarkdown, color: '#000000' },
};

const TaskDemo = () => {
  const { object, submit, isLoading } = useObject({
    api: '/api/agent',
    schema: tasksSchema,
  });

  const handleSubmit = (taskType: string) => {
    submit({ prompt: taskType });
  };

  const renderTaskItem = (item: any, index: number) => {
    if (item?.type === 'file' && item.file) {
      const iconInfo = iconMap[item.file.icon as keyof typeof iconMap];
      if (iconInfo) {
        const IconComponent = iconInfo.component;
        return (
          <span className="inline-flex items-center gap-1" key={index}>
            {item.text}
            <TaskItemFile>
              <IconComponent
                color={item.file.color || iconInfo.color}
                className="size-4"
              />
              <span>{item.file.name}</span>
            </TaskItemFile>
          </span>
        );
      }
    }
    return item?.text || '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            onClick={() => handleSubmit('React component development')}
            disabled={isLoading}
            variant="outline"
          >
            React Development
          </Button>
        </div>

        <div className="flex-1 overflow-auto space-y-4">
          {isLoading && !object && (
            <div className="text-muted-foreground">Generating tasks...</div>
          )}

          {object?.tasks?.map((task: any, taskIndex: number) => (
            <Task key={taskIndex} defaultOpen={taskIndex === 0}>
              <TaskTrigger title={task.title || 'Loading...'} />
              <TaskContent>
                {task.items?.map((item: any, itemIndex: number) => (
                  <TaskItem key={itemIndex}>
                    {renderTaskItem(item, itemIndex)}
                  </TaskItem>
                ))}
              </TaskContent>
            </Task>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDemo;
```

Add the following route to your backend:

```ts filename="app/api/agent.ts"
import { streamObject } from 'ai';
import { z } from 'zod';

export const taskItemSchema = z.object({
  type: z.enum(['text', 'file']),
  text: z.string(),
  file: z
    .object({
      name: z.string(),
      icon: z.string(),
      color: z.string().optional(),
    })
    .optional(),
});

export const taskSchema = z.object({
  title: z.string(),
  items: z.array(taskItemSchema),
  status: z.enum(['pending', 'in_progress', 'completed']),
});

export const tasksSchema = z.object({
  tasks: z.array(taskSchema),
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamObject({
    model: 'openai/gpt-4o',
    schema: tasksSchema,
    prompt: `You are an AI assistant that generates realistic development task workflows. Generate a set of tasks that would occur during ${prompt}.

    Each task should have:
    - A descriptive title
    - Multiple task items showing the progression
    - Some items should be plain text, others should reference files
    - Use realistic file names and appropriate file types
    - Status should progress from pending to in_progress to completed

    For file items, use these icon types: 'react', 'typescript', 'javascript', 'css', 'html', 'json', 'markdown'

    Generate 3-4 tasks total, with 4-6 items each.`,
  });

  return result.toTextStreamResponse();
}
```

## Features

- Visual icons for pending, in-progress, completed, and error states
- Expandable content for task descriptions and additional information
- Built-in progress counter showing completed vs total tasks
- Optional progressive reveal of tasks with customizable timing
- Support for custom content within task items
- Full type safety with proper TypeScript definitions
- Keyboard navigation and screen reader support

## Props

### `<Task />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Collapsible>',
      description:
        'Any other props are spread to the root Collapsible component.',
      isOptional: true,
    },
  ]}
/>

### `<TaskTrigger />`

<PropertiesTable
  content={[
    {
      name: 'title',
      type: 'string',
      description:
        'The title of the task that will be displayed in the trigger.',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleTrigger>',
      description:
        'Any other props are spread to the CollapsibleTrigger component.',
      isOptional: true,
    },
  ]}
/>

### `<TaskContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleContent>',
      description:
        'Any other props are spread to the CollapsibleContent component.',
      isOptional: true,
    },
  ]}
/>

### `<TaskItem />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description: 'Any other props are spread to the underlying div.',
      isOptional: true,
    },
  ]}
/>

### `<TaskItemFile />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description: 'Any other props are spread to the underlying div.',
      isOptional: true,
    },
  ]}
/>
# Tool

The `Tool` component displays a collapsible interface for showing/hiding tool details. It is designed to take the `ToolUIPart` type from the AI SDK and display it in a collapsible interface.

<Preview path="tool" />

## Installation

```sh
npx ai-elements@latest add tool
```

## Usage

```tsx
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolOutput,
  ToolInput,
} from '@/components/ai-elements/tool';
```

```tsx
<Tool>
  <ToolHeader type="tool-call" state={'output-available' as const} />
  <ToolContent>
    <ToolInput input="Input to tool call" />
    <ToolOutput errorText="Error" output="Output from tool call" />
  </ToolContent>
</Tool>
```

## Usage in AI SDK

Build a simple stateful weather app that renders the last message in a tool using [`useChat`](/docs/reference/ai-sdk-ui/use-chat).

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type ToolUIPart } from 'ai';
import { Button } from '@/components/ui/button';
import { Response } from '@/components/ai-elements/response';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool';

type WeatherToolInput = {
  location: string;
  units: 'celsius' | 'fahrenheit';
};

type WeatherToolOutput = {
  location: string;
  temperature: string;
  conditions: string;
  humidity: string;
  windSpeed: string;
  lastUpdated: string;
};

type WeatherToolUIPart = ToolUIPart<{
  fetch_weather_data: {
    input: WeatherToolInput;
    output: WeatherToolOutput;
  };
}>;

const Example = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/weather',
    }),
  });

  const handleWeatherClick = () => {
    sendMessage({ text: 'Get weather data for San Francisco in fahrenheit' });
  };

  const latestMessage = messages[messages.length - 1];
  const weatherTool = latestMessage?.parts?.find(
    (part) => part.type === 'tool-fetch_weather_data',
  ) as WeatherToolUIPart | undefined;

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          <Button onClick={handleWeatherClick} disabled={status !== 'ready'}>
            Get Weather for San Francisco
          </Button>

          {weatherTool && (
            <Tool defaultOpen={true}>
              <ToolHeader type="tool-fetch_weather_data" state={weatherTool.state} />
              <ToolContent>
                <ToolInput input={weatherTool.input} />
                <ToolOutput
                  output={
                    <Response>
                      {formatWeatherResult(weatherTool.output)}
                    </Response>
                  }
                  errorText={weatherTool.errorText}
                />
              </ToolContent>
            </Tool>
          )}
        </div>
      </div>
    </div>
  );
};

function formatWeatherResult(result: WeatherToolOutput): string {
  return `**Weather for ${result.location}**

**Temperature:** ${result.temperature}  
**Conditions:** ${result.conditions}  
**Humidity:** ${result.humidity}  
**Wind Speed:** ${result.windSpeed}  

*Last updated: ${result.lastUpdated}*`;
}

export default Example;
```

Add the following route to your backend:

```ts filename="app/api/weather/route.tsx"
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages),
    tools: {
      fetch_weather_data: {
        description: 'Fetch weather information for a specific location',
        parameters: z.object({
          location: z
            .string()
            .describe('The city or location to get weather for'),
          units: z
            .enum(['celsius', 'fahrenheit'])
            .default('celsius')
            .describe('Temperature units'),
        }),
        inputSchema: z.object({
          location: z.string(),
          units: z.enum(['celsius', 'fahrenheit']).default('celsius'),
        }),
        execute: async ({ location, units }) => {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const temp =
            units === 'celsius'
              ? Math.floor(Math.random() * 35) + 5
              : Math.floor(Math.random() * 63) + 41;

          return {
            location,
            temperature: `${temp}°${units === 'celsius' ? 'C' : 'F'}`,
            conditions: 'Sunny',
            humidity: `12%`,
            windSpeed: `35 ${units === 'celsius' ? 'km/h' : 'mph'}`,
            lastUpdated: new Date().toLocaleString(),
          };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

## Features

- Collapsible interface for showing/hiding tool details
- Visual status indicators with icons and badges
- Support for multiple tool execution states (pending, running, completed, error)
- Formatted parameter display with JSON syntax highlighting
- Result and error handling with appropriate styling
- Composable structure for flexible layouts
- Accessible keyboard navigation and screen reader support
- Consistent styling that matches your design system
- Auto-opens completed tools by default for better UX

## Examples

### Input Streaming (Pending)

Shows a tool in its initial state while parameters are being processed.

<Preview path="tool-input-streaming" />

### Input Available (Running)

Shows a tool that's actively executing with its parameters.

<Preview path="tool-input-available" />

### Output Available (Completed)

Shows a completed tool with successful results. Opens by default to show the results. In this instance, the output is a JSON object, so we can use the `CodeBlock` component to display it.

<Preview path="tool-output-available" />

### Output Error

Shows a tool that encountered an error during execution. Opens by default to display the error.

<Preview path="tool-output-error" />

## Props

### `<Tool />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof Collapsible>',
      description:
        'Any other props are spread to the root Collapsible component.',
      isOptional: true,
    },
  ]}
/>

### `<ToolHeader />`

<PropertiesTable
  content={[
    {
      name: 'type',
      type: 'ToolUIPart["type"]',
      description: 'The type/name of the tool.',
      isOptional: false,
    },
    {
      name: 'state',
      type: 'ToolUIPart["state"]',
      description:
        'The current state of the tool (input-streaming, input-available, output-available, or output-error).',
      isOptional: false,
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes to apply to the header.',
      isOptional: true,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleTrigger>',
      description: 'Any other props are spread to the CollapsibleTrigger.',
      isOptional: true,
    },
  ]}
/>

### `<ToolContent />`

<PropertiesTable
  content={[
    {
      name: '[...props]',
      type: 'React.ComponentProps<typeof CollapsibleContent>',
      description: 'Any other props are spread to the CollapsibleContent.',
      isOptional: true,
    },
  ]}
/>

### `<ToolInput />`

<PropertiesTable
  content={[
    {
      name: 'input',
      type: 'ToolUIPart["input"]',
      description:
        'The input parameters passed to the tool, displayed as formatted JSON.',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description: 'Any other props are spread to the underlying div.',
      isOptional: true,
    },
  ]}
/>

### `<ToolOutput />`

<PropertiesTable
  content={[
    {
      name: 'output',
      type: 'React.ReactNode',
      description: 'The output/result of the tool execution.',
      isOptional: false,
    },
    {
      name: 'errorText',
      type: 'ToolUIPart["errorText"]',
      description: 'An error message if the tool execution failed.',
      isOptional: false,
    },
    {
      name: '[...props]',
      type: 'React.ComponentProps<"div">',
      description: 'Any other props are spread to the underlying div.',
      isOptional: true,
    },
  ]}
/>Integrate workspaces for activities that involve complex and persistent user interactions

Artifacts is a special user interface mode that allows you to have a workspace like interface along with the chat interface. This is similar to ChatGPT's Canvas and Claude's Artifacts.

The template already ships with the following artifacts:

Text Artifact: Work with text content like drafting essays and emails.
Code Artifact: Write and execute code snippets.
Image Artifact: Work with images like editing, annotating, and processing images.
Sheet Artifact: Work with tabular data like creating, editing, and analyzing data.
Adding a Custom Artifact
To add a custom artifact, you will need to create a folder in the artifacts directory with the artifact name. The folder should contain the following files:

client.tsx: The client-side code for the artifact.
server.ts: The server-side code for the artifact.
Here is an example of a custom artifact called CustomArtifact:


artifacts/
  custom/
    client.tsx
    server.ts
Client-Side Example (client.tsx)
This file is responsible for rendering your custom artifact. You might replace the inner UI with your own components, but the overall pattern (initialization, handling streamed data, and rendering content) remains the same. For instance:


import { Artifact } from "@/components/create-artifact";
import { ExampleComponent } from "@/components/example-component";
import { toast } from "sonner";
 
interface CustomArtifactMetadata {
  // Define metadata your custom artifact might need—the example below is minimal.
  info: string;
}
 
export const customArtifact = new Artifact<"custom", CustomArtifactMetadata>({
  kind: "custom",
  description: "A custom artifact for demonstrating custom functionality.",
  // Initialization can fetch any extra data or perform side effects
  initialize: async ({ documentId, setMetadata }) => {
    // For example, initialize the artifact with default metadata.
    setMetadata({
      info: `Document ${documentId} initialized.`,
    });
  },
  // Handle streamed parts from the server (if your artifact supports streaming updates)
  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    if (streamPart.type === "info-update") {
      setMetadata((metadata) => ({
        ...metadata,
        info: streamPart.content as string,
      }));
    }
    if (streamPart.type === "content-update") {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: draftArtifact.content + (streamPart.content as string),
        status: "streaming",
      }));
    }
  },
  // Defines how the artifact content is rendered
  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return <div>Loading custom artifact...</div>;
    }
 
    if (mode === "diff") {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);
      return (
        <div>
          <h3>Diff View</h3>
          <pre>{oldContent}</pre>
          <pre>{newContent}</pre>
        </div>
      );
    }
 
    return (
      <div className="custom-artifact">
        <ExampleComponent
          content={content}
          metadata={metadata}
          onSaveContent={onSaveContent}
          isCurrentVersion={isCurrentVersion}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Content copied to clipboard!");
          }}
        >
          Copy
        </button>
      </div>
    );
  },
  // An optional set of actions exposed in the artifact toolbar.
  actions: [
    {
      icon: <span>⟳</span>,
      description: "Refresh artifact info",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Please refresh the info for my custom artifact.",
        });
      },
    },
  ],
  // Additional toolbar actions for more control
  toolbar: [
    {
      icon: <span>✎</span>,
      description: "Edit custom artifact",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Edit the custom artifact content.",
        });
      },
    },
  ],
});
Server-Side Example (server.ts)

The server file processes the document for the artifact. It streams updates (if applicable) and returns the final content. For example:


import { smoothStream, streamText } from "ai";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";
import { updateDocumentPrompt } from "@/lib/ai/prompts";
 
export const customDocumentHandler = createDocumentHandler<"custom">({
  kind: "custom",
  // Called when the document is first created.
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";
    // For demonstration, use streamText to generate content.
    const { fullStream } = streamText({
      model: myProvider.languageModel("artifact-model"),
      system:
        "Generate a creative piece based on the title. Markdown is supported.",
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: title,
    });
 
    // Stream the content back to the client.
    for await (const delta of fullStream) {
      if (delta.type === "text-delta") {
        draftContent += delta.textDelta;
        dataStream.writeData({
          type: "content-update",
          content: delta.textDelta,
        });
      }
    }
 
    return draftContent;
  },
  // Called when updating the document based on user modifications.
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";
    const { fullStream } = streamText({
      model: myProvider.languageModel("artifact-model"),
      system: updateDocumentPrompt(document.content, "custom"),
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: description,
      experimental_providerMetadata: {
        openai: {
          prediction: {
            type: "content",
            content: document.content,
          },
        },
      },
    });
 
    for await (const delta of fullStream) {
      if (delta.type === "text-delta") {
        draftContent += delta.textDelta;
        dataStream.writeData({
          type: "content-update",
          content: delta.textDelta,
        });
      }
    }
 
    return draftContent;
  },
});
Once you have created the client and server files, you can import the artifact in the lib/artifacts/server.ts file and add it to the documentHandlersByArtifactKind array.


export const documentHandlersByArtifactKind: Array<DocumentHandler> = [
  ...,
  customDocumentHandler,
];
 
export const artifactKinds = [..., "custom"] as const;
Specify it in document schema at lib/db/schema.ts.


export const document = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: [..., "custom"] }) // Add the custom artifact kind here
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  },
);
And also add the client-side artifact to the artifactDefinitions array in the components/artifact.tsx file.


import { customArtifact } from "@/artifacts/custom/client";
 
export const artifactDefinitions = [..., customArtifact];
You should now be able to see the custom artifact in the workspace! Personalize the colors, spacing, and shapes of your project's user interface.

Chat SDK uses Tailwind for styling and shadcn/ui for components. Since most of the components used in the Chat SDK like buttons and inputs are built using shadcn/ui primitives, you can collectively customize the appearance of the components to follow the theme of your application by modifying the CSS variables in app/global.css.

Convention
You can use a simple background and foreground convention for colors. The background variable is used for the background color of the component and the foreground variable is used for the text color.

The background suffix is omitted when the variable is used for the background color of the component.

Given the following CSS variables:


--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 98%;
The background color of the following component will be var(--primary) and the foreground color will be var(--primary-foreground).


<div className="bg-primary text-primary-foreground">Hello</div>
List of variables
Here's the list of variables available for customization:

app/globals.css

@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 240 5.9% 10%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 240 10% 3.9%;
        --chart-1: 12 76% 61%;
        --chart-2: 173 58% 39%;
        --chart-3: 197 37% 24%;
        --chart-4: 43 74% 66%;
        --chart-5: 27 87% 67%;
        --radius: 0.5rem;
        --sidebar-background: 0 0% 98%;
        --sidebar-foreground: 240 5.3% 26.1%;
        --sidebar-primary: 240 5.9% 10%;
        --sidebar-primary-foreground: 0 0% 98%;
        --sidebar-accent: 240 4.8% 95.9%;
        --sidebar-accent-foreground: 240 5.9% 10%;
        --sidebar-border: 220 13% 91%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
    .dark {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 0 0% 98%;
        --primary-foreground: 240 5.9% 10%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 240 4.9% 83.9%;
        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
        --sidebar-background: 240 5.9% 10%;
        --sidebar-foreground: 240 4.8% 95.9%;
        --sidebar-primary: 224.3 76.3% 48%;
        --sidebar-primary-foreground: 0 0% 100%;
        --sidebar-accent: 240 3.7% 15.9%;
        --sidebar-accent-foreground: 240 4.8% 95.9%;
        --sidebar-border: 240 3.7% 15.9%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
} 
Customization
Fonts
Customize the typography of your project's user interface.

Chat SDK ships with Geist as the default font family, for both mono and sans styles.

The easiest way to change the font is to use next/font to import the font family and add it to your Tailwind CSS config.

In the example below, we use the font Inter from next/font/google (you can use any font from Google or Local Fonts). Load your font with the variable option to define your CSS variable name and assign it to inter. Then, use inter.variable to add the CSS variable to your HTML document.

app/layout.tsx

import { Inter, Roboto_Mono } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
Finally, add the CSS variable to your Tailwind CSS config:

tailwind.config.ts

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}
The updated fonts should now be applied to your project's user interface. Testing your Chat SDK application involves two key components:

E2E Tests: End-to-end tests simulate the full lifecycle of the application, from user interactions to server responses.
Mock Models: Mock language models simulate responses based on different prompts.
End-to-End Testing With Playwright
Chat SDK ships with Playwright for end-to-end testing. Playwright is a powerful tool for automating web browsers and testing web applications, so it's a great choice for testing your Chat SDK application as well. Playwright also provides a simple API for writing tests, and it supports multiple browsers, including Chrome, Firefox, and WebKit.

Your project already comes with a set of tests that check the basic functionality of the Chat SDK. These tests can be found in the tests directory of your project.

Along with these tests, there are also a few helper classes that you can use to make your tests more readable and maintainable. These classes provide a set of common actions that you can use to interact with the Chat SDK application, such as logging in, creating a new chat, and sending a message. These helper classes are located in the tests/pages directory of your project.

Writing a Test
The following is an example of a test that uses the helper classes to create a new chat and send a message.

tests/chat.test.ts

import { ChatPage } from './pages/chat';
import { test, expect } from '@playwright/test';
 
test.describe('chat activity', () => {
  let chatPage: ChatPage;
 
  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    await chatPage.createNewChat();
  });
 
  test('send a user message and receive response', async () => {
    await chatPage.sendUserMessage('Why is grass green?');
    await chatPage.isGenerationComplete();
 
    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content).toContain("It's just green duh!");
  });
});
Creating Mock Models
Testing language models can be challenging, because they are non-deterministic and calling them is slow and expensive.

Chat SDK uses a test provider with mock models to simulate the behavior of the different language models. These models are defined in lib/ai/models.test.ts.

lib/ai/models.test.ts

import { simulateReadableStream } from 'ai';
import { MockLanguageModelV1 } from 'ai/test';
import { getResponseChunksByPrompt } from '@/tests/prompts/utils';
 
export const chatModel = new MockLanguageModelV1({
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});
You also have the ability to define the response outputs based on the input prompt. This allows you to test different capabilities like tool calling, artifacts, reasoning, etc. You can define the response outputs in tests/prompts/utils.ts.

tests/prompts/utils.ts

if (compareMessages(recentMessage, TEST_PROMPTS.USER_SKY)) {
  return [
    ...reasoningToDeltas('The sky is blue because of rayleigh scattering!'),
    ...textToDeltas("It's just blue duh!"),
    {
      type: 'finish',
      finishReason: 'stop',
      logprobs: undefined,
      usage: { completionTokens: 10, promptTokens: 3 },
    },
  ];
} The useChat hook has experimental support for resuming an ongoing chat generation stream by any client, either after a network disconnect or by reloading the chat page. This can be useful for building applications that involve long-running conversations or for ensuring that messages are not lost in case of network failures.

The following are the pre-requisities for your chat application to support resumable streams:

Installing the resumable-stream package that helps create and manage the publisher/subscriber mechanism of the streams.
Creating a Redis instance to store the stream state and setting either REDIS_URL or KV_URL.
Creating a table that tracks the stream IDs associated with a chat.
To resume a chat stream, you will use the experimental_resume function returned by the useChat hook. You will call this function during the initial mount of the hook inside the main chat component.


'use client'
 
import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/input";
import { Messages } from "@/components/messages";
 
export function Chat() {
  const { experimental_resume } = useChat({id});
 
  useEffect(() => {
    experimental_resume();
 
    // we use an empty dependency array to
    // ensure this effect runs only once
  }, [])
 
  return (
    <div>
      <Messages>
      <Input/>
    </div>
  )
}
The experimental_resume function makes a GET request to your configured chat endpoint (or /api/chat by default) whenever your client calls it. If there’s an active stream, it will pick up where it left off, otherwise it simply finishes without error.

The GET request automatically appends the chatId query parameter to the URL to help identify the chat the request belongs to. Using the chatId, you can look up the most recent stream ID from the database and resume the stream.Our typography styles can be consumed as Tailwind classes. The classes below pre-set a combination of font-size, line-height, letter-spacing, and font-weight for you based on the Geist Core Figma system.

To make use of the Subtle and Strong modifiers, all you have to do is use the <strong> element nested as the descendant of a given typography class:


<p className="text-copy-16">
  Copy 16 <strong>with Strong</strong>
</p>
Headings
Used to introduce pages or sections.

Example	Class name	Usage
Heading 72
text-heading-72	Marketing heroes.
Heading 64
text-heading-64	—
Heading 56
text-heading-56	—
Heading 48
text-heading-48	—
Heading 40
text-heading-40	—
Heading 32 with Subtle
text-heading-32	Marketing subheadings, paragraphs, and dashboard headings.
Heading 24 with Subtle
text-heading-24	—
Heading 20 with Subtle
text-heading-20	—
Heading 16 with Subtle
text-heading-16	—
Heading 14
text-heading-14	—
Buttons
Only to be used within components that render buttons.

Example	Class name	Usage
Button 16
text-button-16	Largest button.
Button 14
text-button-14	Default button.
Button 12
text-button-12	Only used when a tiny button is placed inside an input field.
Label
Designed for single-lines, and given ample line-height for highlighting & marrying up with icons.

Example	Class name	Usage
Label 20
text-label-20	Marketing text.
Label 18
text-label-18	—
Label 16 with Strong
text-label-16	Used in titles to help differentiate from regular
Label 14 with Strong
text-label-14	Most common text style of all. Used in many menus.
Label 14 Mono
text-label-14-mono	Largest form of mono, to pair with larger (>14) text.
Label 13 with Strong, and Tabular (123)
text-label-13	Used as a secondary line next to other labels. Tabular is used when conveying numbers for consistent spacing.
Label 13 Mono
text-label-13-mono	Used to pair with Label 14, as the smaller mono size looks better in that pairing.
Label 12 with Strong, AND CAPS
text-label-12	Used for tertiary level text in busy views, like Comments, Show More and the capitals in Calendars.
Label 12 Mono
text-label-12-mono	—
Copy
Designed for multiple lines of text, having a higher line height than Label.

Example	Class name	Usage
Copy 24 with Strong
text-copy-24	For hero areas on marketing pages.
Copy 20 with Strong
text-copy-20	For hero areas on marketing pages.
Copy 18 with Strong
text-copy-18	Mainly for marketing, big quotes.
Copy 16 with Strong
text-copy-16	Used in simpler, larger views like Modals where text can breathe.
Copy 14 with Strong
text-copy-14	Most commonly used text style.
Copy 13
text-copy-13	For secondary text and views where space is a premium.
Copy 13 Mono
text-copy-13-mono	Used for inline code mentions.Materials
Presets for radii, fills, strokes, and shadows.

Surface
On the page.

Example	Class name	Usage
Material Base Transparent max W [240px] h [100px]
material-base	Everyday use. Radius 6px.
Material Small Transparent max W [240px] h [100px]
material-small	Slightly raised. Radius 6px.
Material Medium Transparent max W [240px] h [100px]
material-medium	Further raised. Radius 12px.
Material Large Transparent max W [240px] h [100px]
material-large	Further raised. Radius 12px.
Floating
Above the page.

Example	Class name	Usage
Material Tooltip Transparent max W [240px] h [100px]
material-tooltip	Lightest shadow. Corner 6px. Tooltips will be the only floating element with a triangular stem.
Material Menu Transparent max W [240px] h [100px]
material-menu	Lift from page. Radius 12px.
Material Modal Transparent max W [240px] h [100px]
material-modal	Further lift. Radius 12px.
Material Fullscreen Transparent max W [240px] h [100px]
material-fullscreen	Biggest lift. Radius 16pxButton
Trigger an action or event, such as submitting a form or displaying a dialog.

Sizes
The default size is medium.


Hide code

import { Button, Stack } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button size="small">Upload</Button>
      <Button>Upload</Button>
      <Button size="large">Upload</Button>
    </Stack>
  );
}
All Types and Sizes in comparison

Hide code

import { Button } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button type="default" size="small">
          Upload
        </Button>
        <Button type="error" size="small">
          Upload
        </Button>
        <Button type="warning" size="small">
          Upload
        </Button>
        <Button type="secondary" size="small">
          Upload
        </Button>
        <Button type="tertiary" size="small">
          Upload
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button type="default">Upload</Button>
        <Button type="error">Upload</Button>
        <Button type="warning">Upload</Button>
        <Button type="secondary">Upload</Button>
        <Button type="tertiary">Upload</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button type="default" size="large">
          Upload
        </Button>
        <Button type="error" size="large">
          Upload
        </Button>
        <Button type="warning" size="large">
          Upload
        </Button>
        <Button type="secondary" size="large">
          Upload
        </Button>
        <Button type="tertiary" size="large">
          Upload
        </Button>
      </div>
    </div>
  );
}
Shapes
Icon-only buttons should include the svgOnly prop and an aria-label.


Hide code

import { Button, Stack } from 'geist/components';
import { ArrowUp } from 'geist/icons';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button aria-label="Upload" shape="square" size="tiny" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="square" size="small" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="square" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="square" size="large" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="circle" size="tiny" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="circle" size="small" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="circle" svgOnly>
        <ArrowUp />
      </Button>
      <Button aria-label="Upload" shape="circle" size="large" svgOnly>
        <ArrowUp />
      </Button>
    </Stack>
  );
}
Prefix and suffix

Hide code

import { Button, Stack } from 'geist/components';
import { ArrowLeft, ArrowRight } from 'geist/icons';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button prefix={<ArrowLeft />}>Upload</Button>
      <Button suffix={<ArrowRight />}>Upload</Button>
      <Button prefix={<ArrowLeft />} suffix={<ArrowRight />}>
        Upload
      </Button>
    </Stack>
  );
}
Rounded
Combination of shape="rounded" and the shadow prop, often used on marketing pages.


Hide code

import { Button, Stack } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button shadow shape="rounded" size="small" type="secondary">
        Upload
      </Button>
      <Button shadow shape="rounded" type="secondary">
        Upload
      </Button>
      <Button shadow shape="rounded" size="large" type="secondary">
        Upload
      </Button>
    </Stack>
  );
}
Loading

Hide code

import { Button, Stack } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button loading size="small">
        Upload
      </Button>
      <Button loading>Upload</Button>
      <Button loading size="large">
        Upload
      </Button>
    </Stack>
  );
}
Disabled

Hide code

import { Button, Stack } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button disabled size="small">
        Upload
      </Button>
      <Button disabled>Upload</Button>
      <Button disabled size="large">
        Upload
      </Button>
    </Stack>
  );
}
Link
Use ButtonLink for links with the same props as Button.


Hide code

// eslint-disable-next-line rulesdir/mfe-link-imports
import { ButtonLink } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <ButtonLink className="w-fit" href="#">
      Sign Up
    </ButtonLink>
  );
} Switch
Choose between a set of options.

Default
Ensure the width of each item is wide enough to prevent jumping when active.


Source

Output

Hide code

import { Container, Switch } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Container left>
      <Switch name="default">
        <Switch.Control defaultChecked label="Source" value="source" />
        <Switch.Control label="Output" value="output" />
      </Switch>
    </Container>
  );
}
Disabled

Source

Output

Hide code

import { Container, Switch } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Container left>
      <Switch>
        <Switch.Control defaultChecked disabled label="Source" value="source" />
        <Switch.Control disabled label="Output" value="output" />
      </Switch>
    </Container>
  );
}
Sizes

Source

Output

Source

Output

Source

Output

Hide code

import { Container, Switch } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Container direction={['column', 'column', 'row']} top>
      <Container left>
        <Switch name="sizes-small" size="small">
          <Switch.Control defaultChecked label="Source" value="source" />
          <Switch.Control label="Output" value="output" />
        </Switch>
      </Container>

      <Container left>
        <Switch name="sizes-default">
          <Switch.Control defaultChecked label="Source" value="source" />
          <Switch.Control label="Output" value="output" />
        </Switch>
      </Container>

      <Container left>
        <Switch name="sizes-large" size="large">
          <Switch.Control defaultChecked label="Source" value="source" />
          <Switch.Control label="Output" value="output" />
        </Switch>
      </Container>
    </Container>
  );
}
Full width

Source

Output

Hide code

import { Switch } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Switch name="full-width" style={{ width: '100%' }}>
      <Switch.Control
        defaultChecked
        label="Source"
        size="large"
        value="source"
      />
      <Switch.Control label="Output" size="large" value="output" />
    </Switch>
  );
}
Tooltip

Source

Output

Hide code

import { Container, Switch, Tooltip } from 'geist/components';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Container left>
      <Switch>
        <Tooltip desktopOnly text="View Source">
          <Switch.Control
            defaultChecked
            label="Source"
            name="tooltip"
            size="large"
            value="source"
          />
        </Tooltip>
        <Tooltip desktopOnly text="View Output">
          <Switch.Control
            label="Output"
            name="tooltip"
            size="large"
            value="output"
          />
        </Tooltip>
      </Switch>
    </Container>
  );
}
Icon







Hide code

import { Container, Switch } from 'geist/components';
import { GridSquare, ListUnordered } from 'geist/icons';
import type { JSX } from 'react';

export function Component(): JSX.Element {
  return (
    <Container direction={['column', 'column', 'row']} top>
      <Container left>
        <Switch name="icons-small" size="small">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
      </Container>

      <Container left>
        <Switch name="icons-default">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
      </Container>

      <Container left>
        <Switch name="icons-large" size="large">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
      </Container>
    </Container>
  );
}
