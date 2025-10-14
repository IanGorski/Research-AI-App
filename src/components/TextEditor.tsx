'use client';

import React, { useState, useEffect } from 'react';

interface TextEditorProps {
    content: string;
    onChange: (newContent: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
    const [text, setText] = useState(content);

    // Sincronizar con el content prop cuando cambie el valor 
    useEffect(() => {
        setText(content);
    }, [content]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setText(newText);
        onChange(newText);
    };

    return (
        <textarea
            value={text}
            onChange={handleChange}
            className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
};

export default TextEditor;