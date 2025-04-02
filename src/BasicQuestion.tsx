import 'bootstrap/dist/css/bootstrap.min.css';

type BasicQuestionProps = {navigateTo: (page: string) => void;

};
/*
const BasicQuestion: React.FC<BasicQuestionProps> = ({navigateTo})=> {
    return ("");
};
*/
export function BasicQuestion({navigateTo}: BasicQuestionProps) {
    return <div>Basic Question Page</div>;
  }
