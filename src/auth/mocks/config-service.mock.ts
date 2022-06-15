export const ConfigServiceMock = jest.fn().mockReturnValue({
  get: jest.fn().mockImplementation((key: string) => {
    return key;
  }),
});
