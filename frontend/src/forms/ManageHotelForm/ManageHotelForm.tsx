import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './Guests';
import ImagesSection from './ImagesSection';
import { HotelType } from '../../../../backend/src/models/models';
import { useEffect } from 'react';
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    //create new Form Data object and Call our API

    const formData = new FormData();
    if (hotel) {
      formData.append('hotelId', hotel._id);
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    //
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
    console.log(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-4 py-2 hover:bg-blue-500 text-md disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
