import { useParams } from "react-router-dom";
import DiaryPage from "../DiaryPage"; // DiaryPage 컴포넌트 import
import TodoPage from "../TodoPage";

const DatePage = () => {
  const { date } = useParams();

  return (
    <div className="date-page">
      <h1>Date: {date}</h1>
      {/* Todo 관련 컴포넌트들 */}
      <TodoPage></TodoPage>
      {/* DiaryPage 컴포넌트 렌더링 */}
      <DiaryPage></DiaryPage>
    </div>
  );
};

export default DatePage;
