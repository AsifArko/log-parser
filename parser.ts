import Utility from './infra/utility/utility';
import Service from './infra/service/service';
import System from './infra/enums/system';
import Message from './infra/enums/message';

/**
 * Parse function parse arguments
 * Makes commands from argv
 * Executes services
 */
function parse() {
  const utility: Utility = new Utility();
  const service: Service = new Service();

  try {
    let args = process.argv;

    if (args.length === System.ARG_LENGTH) {
      args[3] = `${__dirname}/${args[3].substring(2)}`;
      args[5] = `${__dirname}/${args[5].substring(2)}`;

      const command = utility.generateCommand(args.slice(2, 6));

      service.execute(command).then(() => {
        console.log(Message.SUCCESS);
      });
    } else {
      console.error(Message.USAGE);
    }
  } catch (err) {
    console.error(JSON.stringify(JSON.parse(err)));
  }
}

parse();
