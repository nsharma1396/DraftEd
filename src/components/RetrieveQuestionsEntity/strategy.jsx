
const findQuestionsEntity = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'QnA'
      )
    },
    (start,end)=>{
      callback(start,end)
    }
  );
};

export default findQuestionsEntity;