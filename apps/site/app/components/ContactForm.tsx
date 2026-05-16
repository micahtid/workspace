"use client";

export default function ContactForm() {
    return (
        <div className="mt-16 sm:mt-24 pb-44">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 shrink-0">Contact</h2>
                <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow ml-4" />
            </div>

            <form
                action="mailto:tidballmicah@gmail.com"
                method="post"
                encType="text/plain"
                className="space-y-3"
            >
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="flex-1 px-0 py-2 bg-transparent text-sm border-b border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-800 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="flex-1 px-0 py-2 bg-transparent text-sm border-b border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-800 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        required
                    />
                </div>

                <textarea
                    name="message"
                    placeholder="Message"
                    rows={1}
                    className="w-full px-0 py-2 bg-transparent text-sm border-b border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-800 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none overflow-hidden"
                    required
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />

                <div className="pt-2">
                    <button
                        type="submit"
                        className="text-sm font-medium text-white dark:text-neutral-900 bg-neutral-800 dark:bg-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-300 px-5 py-2 rounded-lg cursor-pointer border-none transition-colors"
                    >
                        Send message
                    </button>
                </div>
            </form>
        </div>
    );
}
