import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Import the functions to be tested
import { fetchCurrentWeather } from './src/api/current.js';
import { fetch7DayForecast } from './src/api/forecast.js';
import { fetchHourlyForecast } from './src/api/byHour.js';

// --- Mocks Setup ---

// Mock the environment variables that your functions use
vi.stubEnv('VITE_API_USERNAME', 'test_user');
vi.stubEnv('VITE_API_PASSWORD', 'test_password');

// Mock the global `fetch` function.
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

// We will define the spy variable here but initialize it in beforeEach
let consoleLogSpy;

describe('Meteomatics API Fetch Functions', () => {

  // Reset mocks AND recreate the spy before each test
  beforeEach(() => {
    fetchMock.mockClear();
    // Re-create the spy before every test. This is the key change!
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  // Restore all mocks after each test to ensure isolation
  afterEach(() => {
    vi.restoreAllMocks();
  });


  // --- Tests for fetchCurrentWeather ---
  describe('fetchCurrentWeather', () => {
    it('should fetch and return current weather data on success', async () => {
      const mockSuccessResponse = { status: 'OK', data: { temperature: 25 } };
      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const data = await fetchCurrentWeather();

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock.mock.calls[0][0]).toContain('https://api.meteomatics.com/now/');
      expect(data).toEqual(mockSuccessResponse);
      expect(consoleLogSpy).toHaveBeenCalledWith('Current Weather Data:', mockSuccessResponse);
    });

    it('should throw an error if the API response is not ok', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(fetchCurrentWeather()).rejects.toThrow('HTTP error! status: 401');
    });
  });

  // --- Tests for fetch7DayForecast ---
  describe('fetch7DayForecast', () => {
    it('should fetch and return 7-day forecast data on success', async () => {
      const mockSuccessResponse = { status: 'OK', data: [{ day: 'Monday' }] };
      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const data = await fetch7DayForecast();

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock.mock.calls[0][0]).toContain(':P1D');
      expect(data).toEqual(mockSuccessResponse);
      expect(consoleLogSpy).toHaveBeenCalledWith('7-Day Forecast Data:', mockSuccessResponse);
    });

    it('should throw an error if the API response is not ok', async () => {
        fetchMock.mockResolvedValue({
          ok: false,
          status: 403,
        });

        await expect(fetch7DayForecast()).rejects.toThrow('HTTP error! status: 403');
    });
  });

  // --- Tests for fetchHourlyForecast ---
  describe('fetchHourlyForecast', () => {
    it('should fetch and return hourly forecast data on success', async () => {
      const mockSuccessResponse = { status: 'OK', data: [{ hour: '13:00' }] };
      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const data = await fetchHourlyForecast();

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock.mock.calls[0][0]).toContain(':PT1H');
      expect(data).toEqual(mockSuccessResponse);
      expect(consoleLogSpy).toHaveBeenCalledWith('Hourly Forecast Data:', mockSuccessResponse);
    });

    it('should throw an error if the API response is not ok', async () => {
        fetchMock.mockResolvedValue({
          ok: false,
          status: 500,
        });

        await expect(fetchHourlyForecast()).rejects.toThrow('HTTP error! status: 500');
    });
  });
});