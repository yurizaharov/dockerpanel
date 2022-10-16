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

    .get('/services', async ctx => {
        const servicesList = await docker.listServices();
        ctx.body = JSON.stringify(servicesList, null, 4);
    })

    .post('/remove', koaBody, async (ctx) => {
        console.log(ctx.request.body.Id + ' was removed');
        await docker.getContainer(ctx.request.body.Id).stop();
        const dockerList = await docker.listContainers();
        ctx.body = JSON.stringify(dockerList, null, 4);
    })

    .get('/update', async () => {ack
        console.log('update');
        var opts = {
            "Name": "redis",
            "version": parseInt(23),
            "TaskTemplate": {
                "ContainerSpec": {
                    "Image": "redis"
                },
                "Resources": {
                    "Limits": {},
                    "Reservations": {}
                },
                "RestartPolicy": {},
                "Placement": {}
            },
            "Mode": {
                "Replicated": {
                    "Replicas": 1
                }
            },
            "UpdateConfig": {
                "Parallelism": 1
            },
            "EndpointSpec": {
                "ExposedPorts": [{
                    "Protocol": "tcp",
                    "Port": 6379
                }]
            }
        };
        const service = await docker.getService('m7v6dklcij6al0itz9uwrycun');
        console.log(JSON.stringify(service));
//        await service.update(opts);
    });

module.exports = router;

//Labels["com.docker.stack.namespace"]