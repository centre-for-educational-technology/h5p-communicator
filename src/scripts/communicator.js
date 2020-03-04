var H5P = H5P || {};
var $ = H5P.jQuery;

function constructor(options, id) {
  this.options = options;
  this.id = id;

  this.playAudio = (audio) => {
    if (audio) {
      url = H5P.getPath(audio.path, that.id);
      var a = new Audio(url);
      a.play();
    }
  };
}

constructor.prototype.attach = function ($container) {
  var that = this;

  $container.addClass("h5p-communicator");
  //$container.append('<p>' + JSON.stringify(this.options) + '</p>');

  var width = this.options.rows[0].length;
  var height = this.options.rows.length;

  $container.append('<div class="table-display"><table style="width:100%;height:100%;"></table></div>');

  var $table = $container.find('.table-display table');

  this.options.rows.forEach(row => {
    $table.append('<tr style="height:' + 100 / height +'%;"></tr>');

    var $row = $table.find('tr:last-of-type');

    row.forEach(cell => {
      $row.append('<td style="width:' + 100 / width + '%;"><img src="' + H5P.getPath(cell.image.path, this.id) + '"></td>');

      var $img = $row.find('td:last-of-type img');
      $img.click(function () { that.playAudio(cell.audio); });
      $img.on('load', function() {
        H5P.trigger(that, 'resize');
      });
    });
  });
}

H5P.Communicator = constructor;