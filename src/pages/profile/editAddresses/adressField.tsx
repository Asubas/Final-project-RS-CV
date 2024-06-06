import './adressField.scss';
import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MyInput from '../../../components/input/input';

function AddressField({
  variant,
  defaultBilAd = '',
  defaultShipAd = '',
}: {
  variant: Address;
  defaultBilAd: string;
  defaultShipAd: string;
}) {
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      country: variant.country,
      city: variant.city,
      streetName: variant.streetName,
      postalCode: variant.postalCode,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState<Address>({
    id: variant.id,
    country: variant.country,
    city: variant.city,
    streetName: variant.streetName,
    postalCode: variant.postalCode,
  });
  const updateAddressOnServer = async (data: Address) => {
    return { data: data };
  };

  const onSubmit = async (data: Address) => {
    try {
      const response = await updateAddressOnServer(data);
      setUpdatedAddress(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };
  const postalCodeValidation = (value: string, country: string) => {
    if (country.toUpperCase() === 'RU' || country.toUpperCase() === 'BY') {
      return /^\d{6}$/.test(value) || 'Postal code must be 6 digits for Russia and Belarus';
    } else if (country.toUpperCase() === 'PL') {
      return /^\d{2}-\d{3}$/.test(value) || 'Postal code must be in the format xx-xxx for Poland';
    } else if (country.toUpperCase() === 'AT') {
      return /^\d{4}$/.test(value) || 'Postal code must be 4 digits for Austria';
    } else if (country.toUpperCase() === 'RS' || country.toUpperCase() === 'FR') {
      return /^\d{5}$/.test(value) || 'Postal code must be 5 digits for Serbia and France';
    }
    return 'Postal code validation is not supported for the selected country';
  };

  return (
    <div className="addressField">
      {isEditing ? (
        <form className="addressForm" data-id={variant.id} onSubmit={handleSubmit(onSubmit)}>
          <div key={variant.id} className="address" data-id={variant.id}>
            {variant.id === defaultBilAd && (
              <span className="default_address">Default billing variant</span>
            )}
            {variant.id === defaultShipAd && (
              <span className="default_address">Default shipping variant</span>
            )}
            <div className="address_line">
              <p className="address_label">Country:</p>
              <Controller
                control={control}
                name="country"
                rules={{
                  required: 'Country is required',
                  pattern: {
                    value: /^(?:RU|BY|AT|PL|RS|FR)$/i,
                    message:
                      'Please enter one of the following: RU(Russia), BY(Belarus), AT(Austria), PL(Poland), RS(Serbia) or FR(France)',
                  },
                }}
                render={({ field }) => <input type="text" className="address_value" {...field} />}
              />
              {errors.country && <span>{errors.country.message}</span>}
            </div>
            <div className="address_line">
              <p className="address_label">City:</p>
              <MyInput
                className="address_value"
                autoComplete="current-password"
                type={'text'}
                placeholder="City: "
                {...register('city', {
                  required: 'This field must be completed',
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message:
                      'Must contain at least one latin character and no special characters or numbers',
                  },
                })}
                style={{
                  border: errors.city ? '1px solid red' : '',
                }}
              />
              {errors.city && <span>{errors.city.message}</span>}
            </div>
            <div className="address_line">
              <p className="address_label">Street:</p>
              <MyInput
                className="address_value"
                autoComplete="current-password"
                type={'text'}
                placeholder="Street: "
                {...register('streetName', {
                  required: 'This field must be completed',
                  pattern: {
                    value: /.*[A-Za-z]+.*/,
                    message: 'Must contain at least one latin character',
                  },
                })}
                style={{
                  border: errors.streetName ? '1px solid red' : '',
                }}
              />
              {errors.streetName && <span>{errors.streetName.message}</span>}
            </div>
            <div className="address_line">
              <p className="address_label">Postal Code:</p>
              <Controller
                control={control}
                name="postalCode"
                rules={{
                  required: 'Postal Code is required',
                  validate: (value) => postalCodeValidation(value as string, watch('country')),
                }}
                render={({ field }) => <input type="text" className="address_value" {...field} />}
              />
              {errors.postalCode && <span>{errors.postalCode.message}</span>}
            </div>
            <div className="address_actions">
              <button type="submit" className="updateButton" disabled={isSubmitting}>
                {'✔️ '}
              </button>
              <button type="button" className="cancelButton" onClick={() => setIsEditing(false)}>
                {'❌ '}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div key={variant.id} className="address" data-id={variant.id}>
          {variant.id === defaultBilAd && (
            <span className="default_address">Default billing variant</span>
          )}

          {variant.id === defaultShipAd && (
            <span className="default_address">Default shipping variant</span>
          )}
          <div className="address_line">
            <p className="address_label">Country:</p>
            <span className="address_value">{updatedAddress.country}</span>
          </div>
          <div className="address_line">
            <p className="address_label">City:</p>
            <span className="address_value">{updatedAddress.city}</span>
          </div>
          <div className="address_line">
            <p className="address_label">Street:</p>
            <span className="address_value">{updatedAddress.streetName}</span>
          </div>
          <div className="address_line">
            <p className="address_label">Postal Code:</p>
            <span className="address_value">{updatedAddress.postalCode}</span>
          </div>
          <div className="address_actions">
            <button type="button" className="editButton" onClick={() => setIsEditing(true)}>
              {'🖊️'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { AddressField };
