import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import { UploadBeforeReturn } from "suneditor-react/dist/types/upload";
import "suneditor/dist/css/suneditor.min.css";

import AuthLayout from "@/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Isi, PageProps } from "@/types";
import InputError from "@/components/input-error";

interface IndexProps extends PageProps {
    isi: Isi;
}
function Index() {
    // hooks
    const { isi } = usePage<IndexProps>().props;
    const { data, setData, post, reset, errors, processing } = useForm({
        isi: isi?.isi ?? "",
    });

    // states
    const editor = React.useRef<SunEditorCore>();

    // events
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;

        if (editor.current) {
            editor.current.setContents(data?.isi);
        }
    };

    const onChangeEditor = (content: string) => {
        setData("isi", content);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("panduan-webgis.store"));
    };

    React.useEffect(() => {
        if (editor.current) {
            editor.current.setContents(data?.isi);
        }
    }, []);

    return (
        <AuthLayout>
            <Head title="Panduan WebGIS" />
            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">
                    Panduan WebGIS
                </h1>
                <form
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-5"
                >
                    <SunEditor
                        name="isi"
                        getSunEditorInstance={getSunEditorInstance}
                        setOptions={{
                            buttonList: [
                                ["undo", "redo"],
                                ["bold", "underline", "italic", "strike"],
                                ["font", "fontSize", "formatBlock"],
                                ["paragraphStyle", "blockquote"],
                                ["outdent", "indent"],
                                ["align", "horizontalRule", "list"],
                                ["link", "image"],
                            ],
                            height: "auto",
                            minHeight: "500px",
                        }}
                        onChange={onChangeEditor}
                    />

                    <InputError message={errors.isi} />

                    <Button className="inline-flex w-fit items-center gap-2">
                        {processing && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <span>Simpan</span>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Index;
