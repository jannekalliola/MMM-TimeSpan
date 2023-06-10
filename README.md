# MMM-TimeSpan
Magic Mirror Module to show how much time has been passed between two dates – one in past and the other one in the future.

## Installation

Clone this repository in your modules folder. There are no dependencies

    cd ~/MagicMirror/modules 
    git clone https://github.com/jannekalliola/MMM-TimeSpan

## Configuration

Go to the MagicMirror/config directory and edit the config.js file. Add the module to your modules array in your config.js.

Enter these details in the config.js for your MagicMirror installation:

        {
            module: "MMM-TimeSpan",
            header: 'Elapsed Time',
            position: "top_right",
            config: {
            }
        },

## Module configuration
The module has the following configuration options:

<table>
  <thead>
    <tr>
      <th>Option</th>
	  <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>dateFormat</code></td>
	  <td><code>yyyy-MM-dd</code></td>
      <td>The format of dates.</td>
    </tr>
    <tr>
      <td><code>updateUIInterval</code></td>
	  <td><code>3600</code></td>
      <td>The interval, in seconds, to redraw the bars.</td>
    </tr>
    <tr>
      <td><code>spans</code></td>
	  <td>Empty array</td>
      <td>The time spans in an array containing objects with the following fields: <code>start</code> and <code>end</code> that define the start and end dates in yyyy-mm-dd format, and <code>title</code> that set the title of the span in question.</td>
    </tr>
  </tbody>
</table>
