import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import OutLineButton from "components/common/OutLineButton";
import { Button } from "components/common/Button";
const Index = () => {
  return (
    <Summary>
      <header>
        <CreateSurveyHeader name="설문의 개요를 작성해주세요." step="01" />
      </header>

      <form>
        <input type="text" placeholder="제목" />
        <textarea placeholder="설문에 대한 설명을 적어주세요" name="설문개요" id="" cols="30" rows="10"></textarea>
        <ButtonContainer>
          <OutLineButton isDisabled={false} textColor={Common.colors.GY900} btnText="임시저장" borderColor={Common.colors.GY900} />
          <Button isDisabled={false} textColor="#fff" btnText="다음" color={Common.colors.BL500} />
        </ButtonContainer>
      </form>
    </Summary>
  );
};

export default Index;

const Summary = styled.div`
  position: relative;

  & header {
    margin-bottom: 28px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 34px;
  right: 26px;

  & button {
    height: 36px;
    font-size: 0.75rem;
    padding: 9px 15px;
    border-radius: 5px;
  }
  & button:not(:last-child) {
    margin-right: 15px;
  }
`;
