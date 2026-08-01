import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import secret from "../../config/config";
import { useSelector } from 'react-redux';

type RTEProps = {
    name: string;
    control: any;
    label?: string;
    defaultValue?: string;
}

const RTE = ({ name, control, label, defaultValue = "" }: RTEProps) => {
    const theme = useSelector((state: any) => state.ux.theme);
    return (
        <div className='w-full'>
            {
                label &&
                <label className='block mb-1 text-(--text-muted) text-sm'>
                    {label}
                </label>
            }
            <Controller
                name={name || "Content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange } }) => (
                    <Editor
                        key={theme}
                        apiKey={secret.tinyMceApi}
                        initialValue={defaultValue}
                        init={{
                            initialValues: defaultValue,
                            height: 500,
                            menubar: true,
                            skin: theme === "dark" ? "oxide-dark" : "oxide",
                            content_css: theme === "dark" ? "dark" : "default",
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style:
                            `
                                body {
                                background-color: ${theme === "dark" ? "#131A2B" : "#E9EDF5"};
                                color: ${theme === "dark" ? "#E2E8F0" : "#1A2238"};
                                font-family: system-ui;
                                font-size: 14px;
                                }
                            `
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE
