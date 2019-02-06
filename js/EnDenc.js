function HTMLEscape(v) {
	return $('<div>').text(v).html();
}

function HTMLUnescape(v) {
	var toEscape = /&(?:#\d+|\w+)+?;/g;
	var vs = v.split(toEscape);
	var escaped = [];
	var out = [];

	var escapeHTML = (_) => $('<div>').html(_).text();
	var c;
	while (c = toEscape.exec(v))
		escaped.push(escapeHTML(c[0]));

	for (i of range(vs.length - 1))
		out.push(vs[i] + (i in escaped && escaped[i] || ""));
	
	return out.join('');
}