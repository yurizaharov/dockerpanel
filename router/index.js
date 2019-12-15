const Router = require('koa-router');
const Docker = require('dockerode');
const KoaBody = require('koa-body');
const convert = require('koa-convert');

const docker = new Docker({socketPath: '/var/run/docker.sock'});
const router = new Router();
const koaBody = convert(KoaBody());

router
    .get('/ping', (ctx) => {
        ctx.body = 'Dockerpanel';
    })

    .get('/docker', async ctx => {
        const dockerList = await docker.listContainers();
        ctx.body = JSON.stringify(dockerList, null, 4);
    })

    .post('/remove', koaBody, async (ctx) => {
        console.log(ctx.request.body.Id + ' was removed');
        await docker.getContainer(ctx.request.body.Id).stop();
        const dockerList = await docker.listContainers();
        ctx.body = JSON.stringify(dockerList, null, 4);
    });

module.exports = router;