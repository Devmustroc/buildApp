import React from 'react';
import {BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import {useTheme} from "next-themes";
import {BlockNoteView, Theme, darkDefaultTheme, lightDefaultTheme} from "@/node_modules/@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {useEdgeStore} from "@/lib/edgestore";

type EditorProps = {
    onChange: (value: string) => void;
    data?: string;
    editable?: boolean;
};


const darkTheme = {
    colors: {
        ...lightDefaultTheme.colors,
        editor: {
            text: "#ffffff",
            background: "#0c0a09",
        },
        sideMenu: "#ffffff",
        shadow: "#000000",
        highlights: darkDefaultTheme.colors!.highlights,
    },
} satisfies Theme;


const EditorContents = ({ onChange, data, editable }: EditorProps) => {
    const { edgestore } = useEdgeStore();
    const { resolvedTheme } = useTheme()

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({
            file,
        });

        return res.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: data ? JSON.parse(data) as PartialBlock[] : undefined,
        uploadFile: handleUpload,
    });

    return (
        <div>
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
                theme={resolvedTheme === "dark" ? darkTheme : 'light' }
                editable={editable}
            />
        </div>
    );
};

export default EditorContents;