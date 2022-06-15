export const JwtServiceMock = jest.fn().mockReturnValue({
  signAsync: jest
    .fn()
    .mockImplementation((payload: any, options: any): Promise<string> => {
      if (options.secret == 'JWT_SECRET') {
        return Promise.resolve(
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNGVkZDNlMi02OTg5LTQ3NjctYTNjOC0wMDJlMzBmZTM2YTYiLCJlbWFpbCI6ImlraGVuYS5vd2VuQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQwMDAwfQ.TCglezB7r-IzZz5-rn5JiZ7IY2T3wXhkl25sJmUhE4E',
        );
      }
      if (options.secret == 'JWT_SECRET_REFRESH') {
        return Promise.resolve(
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNGVkZDNlMi02OTg5LTQ3NjctYTNjOC0wMDJlMzBmZTM2YTYiLCJlbWFpbCI6ImlraGVuYS5vd2VuQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQwMDAwfQ.HfThMBsjyhPVqdEWyNIdW0m3l4f-I-3gDTpv4JHTRMQ',
        );
      }
      return Promise.resolve('secret');
    }),
});
