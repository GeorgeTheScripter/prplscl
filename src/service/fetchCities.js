import { ref } from "vue";
import { API_ENDPOINT } from "../constants";

export const fetchCities = () => {
  const data = ref();
  const error = ref();

  const getCity = async (city) => {
    try {
      const params = new URLSearchParams({
        q: city,
        lang: "ru",
        key: import.meta.env.VITE_API_KEY,
        days: 3,
      });

      const res = await fetch(
        `${API_ENDPOINT}/forecast.json?${params.toString()}`
      );

      if (!res.ok) {
        error.value = await res.json();
        data.value = null;
      }

      data.value = await res.json();
      error.value = null;
    } catch (error) {
      error.value = error.message;
    }
  };

  return {
    error,
    data,
    getCity,
  };
};
