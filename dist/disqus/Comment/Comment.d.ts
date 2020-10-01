/// <reference types="react" />
import { IComment } from './interface';
interface Props {
    comment: IComment;
    allComments: IComment[];
}
export default function Comment({ comment, allComments }: Props): JSX.Element;
export {};
