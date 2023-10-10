export const SuggestionCard = ({ fields, suggestion }) => (
  <div className="content">
    { fields.map(field => {
      if (field === 'img' && suggestion[field]) {
        return (<img alt={ `Suggestion for ${ field }` } key={ field } src={ suggestion[field] } className="img"/>);
      }

      if (suggestion[field]) {
        return (<span key={ field } className="text"> { suggestion[field] } </span>);
      }

      return null;
    }) }
  </div>
);
