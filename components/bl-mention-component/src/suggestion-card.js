export const SuggestionCard = ({ fields, suggestion }) => (
  <div className="content">
    { fields.map(field => {
      if (field === 'img' && suggestion[field]) {
        return (<img src={ suggestion[field] } className="img"/>);
      }

      if (suggestion[field]) {
        return (<span className="text"> { suggestion[field] } </span>);
      }

      return null;
    }) }
  </div>
);
