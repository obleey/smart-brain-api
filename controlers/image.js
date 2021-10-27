const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ');

const handleImageApi = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: 'a403429f2ddf4b49b307e318f00e528b', //FACE_DETECT_MODEL
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log('Error: ' + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          'Received failed status: ' +
            response.status.description +
            '\n' +
            response.status.details
        );
        return;
      }

      console.log('Predicted concepts, with confidence values:');
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ': ' + c.value);
      }
      res.json(response);
    }
  );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleImageApi,
};
