import { Code, Wind, Server, ShieldCheck, Database, GitBranch, Bot, FileJson, DraftingCompass } from "lucide-react";

// A very simple component to render technology icons based on keywords in a title
export const TechIcon = ({ title }: { title: string }) => {
    const lowerTitle = title.toLowerCase();

    const iconSize = "h-8 w-8";

    if (lowerTitle.includes("html") || lowerTitle.includes("css")) {
        return <IconHtml5 className={iconSize} />;
    }
    if (lowerTitle.includes("javascript")) {
        return <IconJS className={iconSize} />;
    }
    if (lowerTitle.includes("react")) {
        return <IconReact className={iconSize} />;
    }
    if (lowerTitle.includes("docker")) {
        return <IconDocker className={iconSize} />;
    }
    if (lowerTitle.includes("kubernetes")) {
        return <IconKubernetes className={iconSize} />;
    }
    if (lowerTitle.includes("jenkins")) {
        return <IconJenkins className={iconSize} />;
    }
    if (lowerTitle.includes("network")) {
        return <IconNetwork className={iconSize} />;
    }
    if (lowerTitle.includes("hacking") || lowerTitle.includes("security")) {
        return <ShieldCheck className={iconSize} />;
    }
    if (lowerTitle.includes("data") || lowerTitle.includes("python")) {
        return <Database className={iconSize} />;
    }

    return <Code className={iconSize} />;
};


// SVG Icons for different technologies
// Sourced from: https://simpleicons.org/

const IconHtml5 = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>HTML5</title>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438zM12 17.25l5.42-1.45L18.5 4.5H5.4l1.86 11.3L12 17.25z"/>
    </svg>
);

const IconJS = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>JavaScript</title>
        <path d="M0 0h24v24H0V0zm22.034 18.276c.89-1.432 1.346-3.044 1.346-4.832 0-2.005-.564-3.83-1.688-5.474-.924-1.352-2.15-2.35-3.664-2.982a8.847 8.847 0 00-4.49-.976c-3.13 0-5.83 1.18-7.926 3.538.21-.28.39-.564.54-.852.88-1.586 2.21-2.73 3.98-3.422A9.624 9.624 0 0112.016 2c2.09 0 4.004.634 5.74 1.902 1.68 1.22 2.99 2.85 3.924 4.89.89 1.95.96 3.99.24 5.96-.75 2.06-2.23 3.7-4.44 4.92-1.74 1.02-3.69 1.54-5.84 1.54-1.12 0-2.2-.16-3.24-.48-.84-.27-1.63-.67-2.35-1.18l1.62-1.94c.54.34 1.1.6 1.7.77.6.18 1.22.26 1.86.26 1.2 0 2.3-.25 3.3-.75 1-.5 1.76-1.22 2.28-2.16zM9.48 11.802l-1.32 1.86c-.81-.54-1.48-1.22-2.02-2.02-.54-.81-1.02-1.7-1.42-2.65l1.9-.84c.3.78.65 1.5.98 2.14.36.63.74 1.2 1.18 1.7z"/>
    </svg>
);

const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>React</title>
        <path d="M12.012 2.406c-.01.00-2.106 5.252-2.106 5.252a6.002 6.002 0 0 0-4.184 7.21l-1.57.9c1.02 1.79 2.89 3.01 5.02 3.61v3.01h1.68v-3.01c2.13-.61 3.99-1.82 5.02-3.61l-1.57-.9a6.002 6.002 0 0 0-4.18-7.21s-2.1-5.252-2.11-5.252zm0 1.68c.00 0 1.79 4.472 1.79 4.472a7.682 7.682 0 0 1 5.35 9.22l.45.26c-1.1 1.92-2.95 3.29-5.12 4.02v2.33h-5.36v-2.33c-2.17-.73-4.02-2.1-5.12-4.02l.45-.26a7.682 7.682 0 0 1 5.35-9.22s1.79-4.472 1.79-4.472zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
    </svg>
);

const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>Docker</title>
        <path d="M23.15 12.23a4.53 4.53 0 0 0-.27-1.42c-.22-.64-.53-1.22-.9-1.74l-.23-.29c-.6-.73-1.34-1.3-2.17-1.68a4.63 4.63 0 0 0-1.8-.75c-.68-.13-1.38-.13-2.06 0H3.34a1.13 1.13 0 0 0-.4.07v.01h-.02l-.04-.02h-.01c-.16.08-.3.2-.42.34a1.2 1.2 0 0 0-.3.42l-.02.03v.02a.8.8 0 0 0-.07.35.9.9 0 0 0 0 .28v7.5a2.46 2.46 0 0 0 .34 1.22c.2.45.45.85.76 1.2.4.44.86.8 1.36 1.08.5.28 1.02.48 1.57.6.9.2 2.13.2 3.3.0h.24c.03 0 .07 0 .1-.02h.02l.04.01.04.02.04.01h.02c.04 0 .08 0 .12-.01l.01-.02.02-.01.03-.02c.67-.32 1.27-.78 1.76-1.33l.23-.26.23-.29.2-.27.14-.23.08-.13a4.2 4.2 0 0 0 .22-.72c.03-.2.04-.4.04-.6v-2.1h-7.23v1.34H5.8v-3.8h8.52v1.33H8.55V9.6h5.77V8.26H8.55V6.93h4.43V5.6H5.8v6.8h11.9a4.5 4.5 0 0 0-1.04-2.85 4.34 4.34 0 0 0-2.73-1.57h-.24a.5.5 0 0 0-.15.02c-.01 0-.03 0-.04.01s-.02 0-.03.01l-.01.02a.6.6 0 0 0-.1.08c-.02.02-.03.05-.05.08a1.2 1.2 0 0 0-.06.1c-.01.03-.02.07-.02.1a.53.53 0 0 0 0 .14.5.5 0 0 0 .02.14.39.39 0 0 0 .06.12.38.38 0 0 0 .1.08l.03.01h.01c.02 0 .04 0 .06 0h.01a.5.5 0 0 0 .15-.02h.24c.86.03 1.6.43 2.1 1.05.5.62.75 1.4.7 2.2a3.3 3.3 0 0 1-1.33 2.6c-.02.01-.03.02-.05.03l-.01.01a1.2 1.2 0 0 1-.16.08h-.01l-.02.01h-.03a.5.5 0 0 1-.16.02h-.24c-.03 0-.07 0-.1-.02l-.04-.01h-.01l-.04-.02h-.02a.85.85 0 0 1-.12-.04c-.01 0-.01-.02-.02-.02a1.3 1.3 0 0 1-.15-.14l-.01-.02a.8.8 0 0 1-.05-.12.64.64 0 0 1 0-.2.6.6 0 0 1 .02-.17.6.6 0 0 1 .05-.13.8.8 0 0 1 .1-.14l.02-.02h.02c.02-.01.04-.02.06-.02h.02c.04 0 .08 0 .12 0h.24a.54.54 0 0 0 .15-.02.6.6 0 0 0 .12-.08.7.7 0 0 0 .08-.12.83.83 0 0 0 .05-.15.93.93 0 0 0 0-.34.9.9 0 0 0-.05-.33.8.8 0 0 0-.1-.26c-.03-.05-.07-.1-.1-.14a.7.7 0 0 0-.1-.1.7.7 0 0 0-.17-.08.5.5 0 0 0-.16-.02h-.24a.53.53 0 0 0-.16.02.6.6 0 0 0-.12.08.7.7 0 0 0-.08.12.83.83 0 0 0-.05.15.93.93 0 0 0 0 .34.9.9 0 0 0 .05.33.8.8 0 0 0 .1.26c.03.05.07.1.1.14a.7.7 0 0 0 .1.1.7.7 0 0 0 .17.08.5.5 0 0 0 .16.02h.24a.5.5 0 0 0 .16-.02.6.6 0 0 0 .12-.08.7.7 0 0 0 .08-.12.83.83 0 0 0 .05-.15.93.93 0 0 0 0-.34.9.9 0 0 0-.05-.33.8.8 0 0 0-.1-.26c-.03-.05-.07-.1-.1-.14a.7.7 0 0 0-.1-.1.7.7 0 0 0-.17-.08.5.5 0 0 0-.16-.02h-.24a.5.5 0 0 0-.16.02.6.6 0 0 0-.12.08.7.7 0 0 0-.08.12.83.83 0 0 0-.05.15.93.93 0 0 0 0 .34c0 .12.02.23.05.33a.8.8 0 0 0 .1.26c.03.05.07.1.1.14a.7.7 0 0 0 .1.1.7.7 0 0 0 .17.08.5.5 0 0 0 .16.02h.24a.5.5 0 0 0 .15-.02.6.6 0 0 0 .12-.08.7.7 0 0 0 .08-.12.83.83 0 0 0 .05-.15.93.93 0 0 0 0-.34.9.9 0 0 0-.05-.33.8.8 0 0 0-.1-.26c-.03-.05-.07-.1-.1-.14a.7.7 0 0 0-.1-.1.7.7 0 0 0-.17-.08.5.5 0 0 0-.16-.02h-.24a.53.53 0 0 0-.16.02.6.6 0 0 0-.12.08.7.7 0 0 0-.08.12.83.83 0 0 0-.05.15.93.93 0 0 0 0 .34c0 .12.02.23.05.33a.8.8 0 0 0 .1.26c.03.05.07.1.1.14a.7.7 0 0 0 .1.1.7.7 0 0 0 .17.08.5.5 0 0 0 .16.02h.24a4.4 4.4 0 0 0 2.97-1.28 4.3 4.3 0 0 0 1.54-3.14 4.48 4.48 0 0 0-1.04-2.85z"/>
    </svg>
);

const IconKubernetes = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>Kubernetes</title>
        <path d="M12.33.33a1.44 1.44 0 0 0-1.12.28l-8.6 6.2a1.44 1.44 0 0 0-.6 1.25v8.32a1.44 1.44 0 0 0 .6 1.25l8.6 6.2a1.44 1.44 0 0 0 1.4-.04l8.6-6.16a1.44 1.44 0 0 0 .6-1.25V7.86a1.44 1.44 0 0 0-.6-1.25L12.62.37a1.44 1.44 0 0 0-.29-.04zm-8.8 8.03L9.7 4.14v7.32L2 14.18V8.36zm1.53 7.36L9.7 19.9v-7.22L3.53 15.72zM11.14 2.4l7.07 5.1-5.63 4.02-7.07-5.1zm.01 8.96v9.31l6.97-5.02-6.97-4.29zm8.52-1.63L14 13.7v-7.3L21.2 3.68v5.05zM14 15.08l5.63 4.02-7.16 5.18-5.54-3.98z"/>
    </svg>
);

const IconJenkins = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
        <title>Jenkins</title>
        <path d="M12.01.99C12.01.99 6.25 0 6.25 0v24h3.42V8.76c.49.33 1.01.62 1.57.86.69.3 1.4.52 2.12.63v1.32c-1.07-.24-2.12-.66-3.1-1.25V24h3.41V13.8c.49.33 1.01.62 1.57.86.69.3 1.4.52 2.12.63v1.32c-1.07-.24-2.12-.66-3.1-1.25V24h3.42V8.76c.49.33 1.01.62 1.57.86.69.3 1.4.52 2.12.63v1.32c-1.07-.24-2.12-.66-3.1-1.25V24h3.41V5.06s-5.83-1.02-5.83-1.02L12.01.99zm-.12 3.42c.9 0 1.63.73 1.63 1.63s-.73 1.63-1.63 1.63-1.63-.73-1.63-1.63.73-1.63 1.63-1.63zm0 4.18c.9 0 1.63.73 1.63 1.63s-.73 1.63-1.63 1.63-1.63-.73-1.63-1.63.73-1.63 1.63-1.63z"/>
    </svg>
);

const IconNetwork = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Network</title>
        <rect x="2" y="9" width="4" height="6" rx="1"/>
        <path d="M6 12H12"/>
        <path d="M12 9v6"/>
        <path d="M12 12h6"/>
        <rect x="18" y="9" width="4" height="6" rx="1"/>
        <path d="M12 18v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"/>
        <path d="M12 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/>
    </svg>
);
