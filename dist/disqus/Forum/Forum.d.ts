/// <reference types="react" />
interface Props {
    apiKey: string;
    forumName: string;
    link: string;
    limit?: number;
    proxy?: string;
}
export default function Forum(props: Props): JSX.Element;
export {};
