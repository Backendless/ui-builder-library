# Stripe Payment

Stripe Payment is a component of Backendless UI-Builder designer. You will have a customizable interface which enables secure processing of credit card transactions using Stripe.

Customizations include adjustments of amount, minimal amount and currency label. The payment form is configurable, and thus you can set visibility of separate fields. Also, you have an option to make the amount field editable by the user.

The component is based on external [stripe-js](https://github.com/stripe/stripe-js) and [react-stripe-js](https://github.com/stripe/react-stripe-js) libraries.

## Usage

Before adding the component to the page, open the Marketplace screen and install the [Stripe Integration Plugin](https://backendless.com/features/marketplace/stripe-integration-plugin/) from the Backendless marketplace. The plugin product is available under the All Services menu.

Then add the component to the page and specify the Publishable key in UI-Builder Settings.

### Styles and Settings

<dl>
<dt>Min Amount</dt>
<dd>Value from this field will be used as the minimum amount that can be charged. Defaults to 0.5.</dd>
<dt>Fixed Amount</dt>
<dd>Checkbox for determining whether the payment amount is fixed or can be changed by the user. Checked by default.</dd>
<dt>Currency</dt>
<dd>Value from this field will be used as the currency label. Defaults to USD</dd>
<dt>Name Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the cardholder's name. Unchecked by default.</dd>
<dt>Address Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the address. Unchecked by default.</dd>
<dt>City Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the city name. Unchecked by default.</dd>
<dt>State Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the state name. Unchecked by default.</dd>
<dt>Country Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the country name. Unchecked by default.</dd>
<dt>ZIP Visibility</dt>
<dd>Checkbox for determining whether the payment form contains a field for the postal code or ZIP value. Unchecked by default.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Amount</dt>
<dd>Value from this field will be used as the payment amount. Can be defined by Amount Logic. Defaults to 0.5.</dd>
<dt>On Success Event</dt>
<dd>Triggered when the payment is complete.</dd>
<dt>On Reject Event</dt>
<dd>Triggered when the payment fails.</dd>
<dt>On Focus Event</dt>
<dd>Triggered when the Card Element gains focus.</dd>
<dt>On Blur Event</dt>
<dd>Triggered when the Card Element loses focus.</dd>
<dt>On Change Event</dt>
<dd>Triggered when the Card Element's value changes.</dd>
</dl>

### Actions

<dl>
<dt>Clear Card</dt>
<dd>Action which clear the card field.</dd>
<dt>Blur Card</dt>
<dd>Action which loses the focus of the card field.</dd>
<dt>Focus Card</dt>
<dd>Action which gains the focus of the card field.</dd>
</dl>
