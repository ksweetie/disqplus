/// <reference types="react" />
import { IComment } from './interface';
interface Props {
    comment: IComment;
}
export default function CommentFooter({ comment }: Props): JSX.Element;
export {};
