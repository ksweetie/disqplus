/// <reference types="react" />
import { IComment } from './interface';
interface Props {
    comment: IComment;
    parent: IComment | undefined;
}
export default function CommentHeader({ comment, parent }: Props): JSX.Element;
export {};
