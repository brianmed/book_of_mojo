package Photo;

use Mojo::Base 'Mojolicious';

# use HTTP::BrowserDetect;
use FindBin;

sub is_mobile {
    my $self = shift;

    return(defined $self->mobile());
}

sub mobile {
    my $self = shift;

    my $agent = scalar $self->req->headers->header('user-agent');
    my $browser = HTTP::BrowserDetect->new($agent);
    return($browser->device());
}

# This method will run once at server start
sub startup {
    my $self = shift;

    $ENV{DBI_DSN}="dbi:Pg:dbname=box_of_resumes";

    $self->log->level("debug");

    # 10 MB size limit
    $ENV{MOJO_MAX_MESSAGE_SIZE} = 10485760;

    $self->helper(mobile => \&mobile);
    $self->helper(is_mobile => \&is_mobile);
    
    my $r = $self->routes;

    $self->plugin(AccessLog => {uname_helper => 'set_username', log => "$FindBin::Bin/../log/access.log", format => '%h %l %u %t "%r" %>s %b %D "%{Referer}i" "%{User-Agent}i"'});

    $r->get('/')->to(controller => 'Index', action => 'slash');
}

1;
