import { FormField } from './form-field';

export function BillingDetails({ component }) {
  const {
    nameVisibility,
    addressVisibility,
    cityVisibility,
    stateVisibility,
    countryVisibility,
    zipVisibility,
  } = component;

  const fieldsVisibility = {
    name   : nameVisibility,
    address: addressVisibility,
    city   : cityVisibility,
    state  : stateVisibility,
    country: countryVisibility,
    zip    : zipVisibility,
  };

  const billingDetailsVisibility = (
    addressVisibility || cityVisibility || stateVisibility || countryVisibility || nameVisibility || zipVisibility
  );

  if (!billingDetailsVisibility) {
    return null;
  }

  return (
    <div className="billing-details">
      { FormFields.map((field, index) => (
        <FormField
          key={ index }
          visibility={ fieldsVisibility[field.name] }
          name={ field.name }
          label={ field.label }
          type={ field.type }
          placeholder={ field.placeholder }
        />
      ))}
    </div>
  );
}

const FormFields = [
  {
    name       : 'name',
    label      : 'Name',
    type       : 'text',
    placeholder: 'Jane Doe',
  },
  {
    name       : 'address',
    label      : 'Address',
    type       : 'text',
    placeholder: '185 Berry St. Suite 550',
  },
  {
    name       : 'city',
    label      : 'City',
    type       : 'text',
    placeholder: 'San Francisco',
  },
  {
    name       : 'state',
    label      : 'State',
    type       : 'text',
    placeholder: 'California',
  },
  {
    name       : 'country',
    label      : 'Country',
    type       : 'text',
    placeholder: 'United States',
  },
  {
    name       : 'zip',
    label      : 'ZIP',
    type       : 'text',
    placeholder: '94103',
  },
];
