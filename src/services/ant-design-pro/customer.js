import { extend } from 'umi-request';
const request = extend({
  prefix: '',
  timeout: 50000,
  headers: {
    Authorization:
      'eyJ0eXBlIjoiSldUIiwiZXhwIjoxNjYyNjA3NjU5LCJhbGciOiJIUzI1NiIsImlhdCI6MTY2MTMxMTY1OX0.eyJyb2xlY29kZSI6IjEwIiwidXNlcmd1aWQiOiI3Nzc3NzcifQ.1bd6837a47940762f61a28648b444c84',
  },
});

/**
 * 获取 人工服务 列表
 * GET /service_record/
 * VUE_APP_BASE_API = 'https://test.istudyx.com/api/python/v5'
 * Authorization
 * eyJ0eXBlIjoiSldUIiwiZXhwIjoxNjYyNjA3NjU5LCJhbGciOiJIUzI1NiIsImlhdCI6MTY2MTMxMTY1OX0.eyJyb2xlY29kZSI6IjEwIiwidXNlcmd1aWQiOiI3Nzc3NzcifQ.1bd6837a47940762f61a28648b444c84
 */
export async function getAiServiceList(params) {
  return request('https://test.istudyx.com/api/python/v5/service_record/', {
    method: 'GET',
    params,
  });
}
