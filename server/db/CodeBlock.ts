import mongoose from 'mongoose';

import { CodeBlock } from '../@types/CodeBlock';

const CodeBlockSchema = new mongoose.Schema<CodeBlock>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CodeBlock = mongoose.model<CodeBlock>('CodeBlock', CodeBlockSchema);
export { CodeBlock };
